import Swal from 'sweetalert2';
import { forkJoin } from "rxjs";
import VsudButton from "@/components/VsudButton.vue";
import { observableAxios__obtenerRoles, observableAxios__ingresarUsuario } from '@/js/axios/index.js';
import { numeros, longitud } from '@/js/validaciones/validacion.js';
import { mensajeErrorDatos, mensajeSatisfactorio } from '@/js/validaciones/formularios/funcionesObligatorios.js';

export default {
    name: "Ingreso",
    components: {
        VsudButton,
    },
    data() {
        return {
            formData: {
                cedula: '',
                nombre: '',
                correo: '',
                celular: '',
                direccion: '',
                rol: [],
            },
            errors: {
                cedula: '',
                nombre: '',
                correo: '',
                celular: '',
                direccion: '',
            },
            rolesDisponibles: [],
            selectedRole: '',
        }
    },
    mounted() {
        this.obtener__roles();
    },
    methods: {
        limpiarTexto(event) {
            let texto = event.target.value
                .normalize("NFD") 
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/[ñ]/g, "n") 
                .replace(/[Ñ]/g, "N") 
                .replace(/[^a-zA-Z ]/g, "") 
                .toUpperCase();

            this.formData.nombre = texto;
        },
        guardar() {

            this.errors.nombre = !this.formData.nombre;
            this.errors.correo = !this.formData.correo;
            this.errors.celular = !this.formData.celular;
            this.errors.direccion = !this.formData.direccion;

            if (this.formData.rol <= 0) {

                Swal.fire({
                    title: 'Error',
                    text: 'Obligatorio asignar un rol',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    timer: 5000,
                    timerProgressBar: true,
                    allowOutsideClick: true,
                    allowEscapeKey: true
                });

            } else if (!this.errors.nombre && !this.errors.correo && !this.errors.celular && !this.errors.direccion) {

                forkJoin([observableAxios__ingresarUsuario(this.formData, localStorage.getItem("idCredencial"))]).subscribe({

                    next: (results) => {

                        this.mensaje = results[0].mensaje;

                        if (parseInt(this.mensaje, 10) === 1) {

                            mensajeSatisfactorio();

                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);

                        }

                    },
                    error: (error) => {
                    }

                });

            } else {
                mensajeErrorDatos();
            }

        },
        inputCedula() {

            numeros(document.getElementById("cedula"));
            longitud(document.getElementById("cedula"), 15);

        },
        inputCelular() {

            numeros(document.getElementById("celular"));
            longitud(document.getElementById("celular"), 10);

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
        eliminarRol(index) {
            const rolEliminado = this.formData.rol.splice(index, 1)[0];
            this.rolesDisponibles.push(rolEliminado);
        }
    },

};
