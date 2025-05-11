import Swal from 'sweetalert2';
import { forkJoin } from "rxjs";
import { observableAxios__obtenerRoles__editar, observableAxios__usuarios, observableAxios__editarUsuarios } from '@/js/axios/index.js';
import { mensajeSatisfactorio} from '@/js/validaciones/formularios/funcionesObligatorios.js';

export default {
    name: "Ingreso",
    data() {
        return {
            columns: [
                { data: 'cedula', title: 'CÉDULA', className: 'text-center text-xs' },
                { data: 'nombre', title: 'NOMBRE', className: 'text-center text-xs' },
                { data: 'celular', title: 'CELULAR', className: 'text-center text-xs' },
                { data: 'email', title: 'CORREO', className: 'text-center text-xs' },
                { data: 'roles', title: 'ROL', className: 'text-center text-xs' },
                { data: 'fecha', title: 'FECHA', className: 'text-center text-xs' },
                { data: 'estadoUsuario', title: 'ESTADO', className: 'text-center text-xs' },
            ],
            formDataEditar: {
                cedula: '',
                nombre: '',
                correo: '',
                celular: '',
                direccion: '',
                rol: [],
            },
            rolesDisponibles: [],
            errorsEditar: {
                cedula: '',
                nombre: '',
                correo: '',
                celular: '',
                direccion: '',
            },
            selectedRole: null,
            rolesAnidados: [],
        }
    },
    mounted() {
        this.cargarDatatabletsInicial();
    },
    methods: {
        cargarData() {
            forkJoin([observableAxios__usuarios(localStorage.getItem('idUsuario'))]).subscribe({
                next: (results) => {
                    const data = results[0].informacion;
                    this.data = data;
                    this.dataTable.clear().rows.add(this.data).draw();
                },
                error: (error) => { console.error(error); }
            });
        },

        cargarDatatabletsInicial() {
            this.dataTable = $(this.$refs.dataTable__recibidos).DataTable({
                data: this.data,
                columns: this.columns,
                scrollX: false,
                responsive: true,
                autoWidth: false,
                rowCallback: (row, data) => {
                    const $row = $(row);
                    $row.css('cursor', 'pointer');

                    $row.on('mouseenter', () => {
                        $row.addClass('bg-gray-800 text-white');
                    });

                    $row.on('mouseleave', () => {
                        $row.removeClass('bg-gray-800 text-white');
                    });

                    $row.on('click', () => {
                        const obj = { ...data };
                        const templateHtml = document.querySelector('.contenedor__modal').innerHTML;
                        this.handleRowClick(obj, templateHtml);
                    });
                }
            });

            this.cargarData();
        },

        handleRowClick(objeto, templateHtml) {
            Swal.fire({
                title: '<h1 class="uppercase text-xs">' + objeto.nombre + '</h1><div class="text-xs">' + objeto.usuario + '</div>',
                html: templateHtml,
                showConfirmButton: false,
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>',
                showCancelButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.rolesAnidados = [];
                    this.llenarFormulario(objeto);
                }
            });
        },
        llenarFormulario(objeto) {
            const cedulaEditar = Swal.getHtmlContainer().querySelector('#cedulaEditar');
            cedulaEditar.value = objeto.cedula;

            const nombreEditar = Swal.getHtmlContainer().querySelector('#nombreEditar');
            nombreEditar.value = objeto.nombre;

            nombreEditar.addEventListener('input', (event) => {
                let texto = event.target.value
                .normalize("NFD") 
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/[ñ]/g, "n") 
                .replace(/[Ñ]/g, "N") 
                .replace(/[^a-zA-Z ]/g, "") 
                .toUpperCase();

                nombreEditar.value = texto;
            });

            const correoEditar = Swal.getHtmlContainer().querySelector('#correoEditar');
            correoEditar.value = objeto.email;

            const celularEditar = Swal.getHtmlContainer().querySelector('#celularEditar');
            celularEditar.value = objeto.celular;

            const direccionEditar = Swal.getHtmlContainer().querySelector('#direccionEditar');
            direccionEditar.value = objeto.direccion;

            const estadoEditar = Swal.getHtmlContainer().querySelector('#estadoEditar');
            estadoEditar.value = objeto.estado;

            const contenedorGeneral__seleccionable = Swal.getHtmlContainer().querySelector('#contenedorGeneral__seleccionable');
            contenedorGeneral__seleccionable.value = objeto.direccion;

            const rolEditar = Swal.getHtmlContainer().querySelector('#rolEditar');
            this.llenarRoles(rolEditar, objeto.roles);

            const idRoles = objeto.idRoles;
            const idRolesArray = idRoles.split(',');

            const nombreroles = objeto.roles;
            const nombreArrayRoles = nombreroles.split(',');


            for (let i = 0; i < idRolesArray.length; i++) {
                const value = idRolesArray[i];
                const text = nombreArrayRoles[i];

                this.rolesAnidados.push(value);

                Array.from(rolEditar.options).forEach((option) => {
                    if (this.rolesAnidados.includes(option.value)) {
                        option.style.display = 'none';
                    }
                });

                const div = document.createElement('div');
                div.classList.add('flex', 'items-center', 'bg-blue-600', 'text-white', 'px-3', 'py-1', 'rounded-lg', 'text-sm', "mt-1");

                const span = document.createElement('span');
                span.textContent = text;
                div.appendChild(span);

                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('ml-2', 'text-white', 'hover:text-red-400', 'bg-white');
                button.innerHTML = '✖';
                button.addEventListener('click', () => {
                    this.rolesAnidados = this.rolesAnidados.filter((role) => role !== value);

                    Array.from(rolEditar.options).forEach((option) => {
                        if (option.value === value) {
                            option.style.display = '';
                        }
                    });

                    div.remove();
                });

                div.appendChild(button);

                const contenedorRolesSeleccionados = Swal.getHtmlContainer().querySelector('#rolesSeleccionados');
                if (contenedorRolesSeleccionados) {
                    contenedorRolesSeleccionados.appendChild(div);
                } else {
                    console.error('Contenedor "#rolesSeleccionados" no encontrado en el DOM');
                }

                rolEditar.value = '';
            }

            rolEditar.addEventListener('change', (event) => {
                const selectedOption = event.target.selectedOptions[0];
                const value = selectedOption.value;
                const text = selectedOption.text;
                this.cambiarRolesSeleccionados(value, text, rolEditar);
            });

            const ingresarInformacion = Swal.getHtmlContainer().querySelector('#ingresarInformacion');

            ingresarInformacion.addEventListener('click', (event) => {
                this.enviarInformacion(this.rolesAnidados, cedulaEditar, nombreEditar, correoEditar, celularEditar, direccionEditar, estadoEditar, objeto.idCredencial);
            });

        },
        enviarInformacion(rolesAnidados, cedulaEditar, nombreEditar, correoEditar, celularEditar, direccionEditar, estadoEditar, idCredencialPersona) {
            forkJoin([
                observableAxios__editarUsuarios(
                    rolesAnidados, 
                    cedulaEditar.value, 
                    nombreEditar.value, 
                    correoEditar.value, 
                    celularEditar.value, 
                    direccionEditar.value, 
                    estadoEditar.value, 
                    localStorage.getItem('idCredencial'), 
                    idCredencialPersona
                )
            ]).subscribe({
                next: (results) => {
                    this.mensaje = results[0].mensaje;
        
                    if (parseInt(this.mensaje, 10) === 1) {

                        mensajeSatisfactorio();
        
                        this.cargarData();
                    }
                },
                error: (error) => { 
                    console.error(error); 
                }
            });
        },
        cambiarRolesSeleccionados(value, text, rolEditar) {

            this.rolesAnidados.push(value);

            Array.from(rolEditar.options).forEach((option) => {
                if (this.rolesAnidados.includes(option.value)) {
                    option.style.display = 'none';
                }
            });

            const div = document.createElement('div');
            div.classList.add('flex', 'items-center', 'bg-blue-600', 'text-white', 'px-3', 'py-1', 'rounded-lg', 'text-sm', "mt-1");

            const span = document.createElement('span');
            span.textContent = text;
            div.appendChild(span);

            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('ml-2', 'text-white', 'hover:text-red-400', 'bg-white');
            button.innerHTML = '✖';
            button.addEventListener('click', () => {
                this.rolesAnidados = this.rolesAnidados.filter((role) => role !== value);

                Array.from(rolEditar.options).forEach((option) => {
                    if (option.value === value) {
                        option.style.display = '';
                    }
                });

                div.remove();
            });

            div.appendChild(button);

            const contenedorRolesSeleccionados = Swal.getHtmlContainer().querySelector('#rolesSeleccionados');
            if (contenedorRolesSeleccionados) {
                contenedorRolesSeleccionados.appendChild(div);
            } else {
                console.error('Contenedor "#rolesSeleccionados" no encontrado en el DOM');
            }

            rolEditar.value = '';
        },
        llenarRoles(rolEditar, rolesAsignados) {
            forkJoin([observableAxios__obtenerRoles__editar(localStorage.getItem("idCredencial"))]).subscribe({
                next: (results) => {
                    const roles = results[0].informacion;
                    this.rolesDisponibles = roles;

                    rolEditar.innerHTML = '';

                    const defaultOption = document.createElement('option');
                    defaultOption.value = '';
                    defaultOption.textContent = '--Seleccione un rol--';
                    rolEditar.appendChild(defaultOption);

                    // Llenar el select con los roles obtenidos
                    roles.forEach(rol => {
                        const option = document.createElement('option');
                        option.value = rol.idRol;
                        option.textContent = rol.nombre;
                        rolEditar.appendChild(option);
                    });


                },
                error: (error) => {
                    console.error(error);
                }
            });
        },

        inputCedula(event) {
            this.formDataEditar.cedula = event.target.value;
        },

        inputCelular(event) {
            this.formDataEditar.celular = event.target.value;
        },

        eliminarRol(index) {
            const rolEliminado = this.formDataEditar.rol.splice(index, 1)[0];
            this.rolesDisponibles.push(rolEliminado);
        },
    },
};
