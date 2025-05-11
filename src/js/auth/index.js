import { forkJoin } from "rxjs";
import VsudButton from "@/components/VsudButton.vue";
import ministerioPortada from '@/assets/img/ministerioPortada.svg';
import { mensajeErrorDatos} from '@/js/validaciones/formularios/funcionesObligatorios.js';
import { observableAxios__auth } from '@/js/axios/index.js';
import Swal from 'sweetalert2';
import { numeros, longitud } from '@/js/validaciones/validacion.js';

const body = document.getElementsByTagName("body")[0];

export default {
  name: "Ingreso",
  components: {
    VsudButton,
  },
  data() {
    return {
      formData: {
        usuario:'',
        password:'',
      },
      errors: {
        usuario:'',
        password:'',
      },
      imageSrc: null,
      showPassword: false,
    }
  },
  mounted(){
    this.fetchImageData__inicial();
  },
  methods: {
    inputContrasena() {

      numeros(document.getElementById("password"));
      longitud(document.getElementById("password"), 15);

    },
    fetchImageData__inicial() {
      this.imageSrc =  ministerioPortada;
    },

    ingresar() {

      this.errors.usuario = !this.formData.usuario;
      this.errors.password = !this.formData.password;

      if (!this.errors.usuario && !this.errors.password) {

      forkJoin([observableAxios__auth(this.formData)]).subscribe({

        next: (results) => {

          const resultado=results[0].informacionValidada;

          if(parseInt(resultado,10)!==0){
            localStorage.setItem('cedula', resultado[0].cedula); 
            localStorage.setItem('jwt', resultado[0].jwt); 
            localStorage.setItem('nombre', resultado[0].nombre); 
            localStorage.setItem('idCredencial', resultado[0].idCredencial); 
            localStorage.setItem('ruta', resultado[0].ruta); 

            this.$router.push(resultado[0].ruta);
            
          }else{
            Swal.fire({
                title: 'error',
                text: 'Credenciales incorrectas',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                timer: 5000, 
                timerProgressBar: true,
                allowOutsideClick: true,
                allowEscapeKey: true 
              });
          }


        },
        error: (error) => {
        }

      });

      }else{
        mensajeErrorDatos();
      }

    }
  }, 
  beforeMount() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
