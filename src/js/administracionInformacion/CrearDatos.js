import Swal from 'sweetalert2';
import { forkJoin } from "rxjs";
import VsudButton from "@/components/VsudButton.vue";
import { observableAxios__obtenerRoles} from '@/js/axios/index.js';
import { observableAxios__ingresar,observableAxios__visualizar,observableAxios__visualizar_selector } from '@/js/axios/administracionInformacion/index.js';
import { numeros,longitud} from '@/js/validaciones/validacion.js';
import { mensajeErrorDatos,mensajeSatisfactorio} from '@/js/validaciones/formularios/funcionesObligatorios.js';

export default {
    name: "Ingreso",
    components: {
        VsudButton,
    },
    data() {
        return {
            formData: {
                nombre: "",
            },
            rolesDisponibles: [],
            selectedRole: '',
            errors: {
                nombre: '',
            },
            opciones: [],
        }
    },
    mounted() {
        this.obtener__roles();
    },
    methods: {
        guardar(e){

            e.preventDefault();
            
            this.errors.nombre = !this.formData.nombre;

            let tabla = this.tabla;

            if (!this.errors.nombre) {

                forkJoin([observableAxios__ingresar(this.formData,localStorage.getItem("idCredencial"),this.tabla)]).subscribe({

                    next: (results) => {
                        
                        this.mensaje = results[0].mensaje;

                        if(parseInt(this.mensaje,10)===1){

                            mensajeSatisfactorio();

                            this.formData.nombre = '';
                           

                            this.$emit("accionExitosa");

                        }

                    },
                    error: (error) => {
                    }
    
                });

            }else{
                mensajeErrorDatos();
            }

        },
        obtener__roles() {
            forkJoin([observableAxios__obtenerRoles(localStorage.getItem("idCredencial"))]).subscribe({

                next: (results) => {
                    this.rolesDisponibles = results[0].informacion;
                },
                error: (error) => {
                }

            });
        },
        agregarRol() {
            if (!this.selectedRole) return;

            const existe = this.formData.rol.some(r => r.idRol === this.selectedRole.idRol);
            if (!existe) {
                this.formData.rol.push(this.selectedRole);

                this.rolesDisponibles = this.rolesDisponibles.filter(rol => rol.idRol !== this.selectedRole.idRol);
            }

            this.selectedRole = '';
        },
        cargarSelector(){

            let tabla = this.tabla;
            let tablaConsulta = '';

            if(tabla == 'estanteria'){

                tablaConsulta = 'zona';

            }else if(tabla == 'bandeja'){

                tablaConsulta = 'estanteria';

            }else if(tabla == 'subseccion'){

                tablaConsulta = 'seccion';
            }

            forkJoin([observableAxios__visualizar_selector(tablaConsulta)]).subscribe({

                next: (results) => {

                    this.opciones = results[0]?.informacion || [];

                    console.log("opciones",this.opciones);
                    

                },
                error: (error) => {
                }

            });

        },
    },
    

};
