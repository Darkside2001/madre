import { languageOptions, options__4 } from '@/js/datatablets/index.js';
import { forkJoin } from "rxjs";
import Swal from 'sweetalert2';
import { observableAxios__visualizar,observableAxios__eliminar,observableAxios__editarInformacion,observableAxios__visualizar_selector } from '@/js/axios/AdministracionInformacion/index.js';
import { mensajeErrorDatos,mensajeSatisfactorio} from '@/js/validaciones/formularios/funcionesObligatorios.js';

export default {
    name: "Ingreso",
    props: {
        tabla: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            data: [], 
            columns: [],
            dataTable: null,
            formDataEditar: {
                nombre: '',
            },
            errorsEditar: {
                nombre: '',
            },
            opciones: [],
        };
    },
    mounted() {
        this.generarColumnas();
        this.cargarDatatabletsInicial();
        this.agregarEventosBotones();
    },
    methods: {
        generarColumnas() {
            
            let columnasBase = [
                { data: 'nombre', title: 'NOMBRE', className: 'text-center text-xs' },
            ];

            columnasBase.push({ data: 'estado', title: 'ESTADO', className: 'text-center text-xs' });
            
            columnasBase.push(
                {
                    title: "EDITAR",
                    orderable: false,
                    searchable: false,
                    className: "text-center text-xs",
                    render: (data, type, row) => {
                        return `<button class="btn-editar bg-blue-500 text-white px-2 py-1 rounded" data-id="${row.id}"><i class="fa-solid fa-pencil"></i></button>`;
                    }
                },
                {
                    title: "CAMBIAR ESTADO",
                    orderable: false,
                    searchable: false,
                    className: "text-center text-xs",
                    render: (data, type, row) => {
                        return `<button class="btn-eliminar bg-red-500 text-white px-2 py-1 rounded" data-id="${row.id}"><i class="fa-solid fa-rotate"></i></button>`;
                    }
                }
            );

            this.columns = columnasBase;
        },
        cargarData() {
            forkJoin([observableAxios__visualizar(this.tabla)]).subscribe({
                next: (results) => {
                    const data = results[0]?.informacion || [];
                   
                    this.data = Array.isArray(data) ? data : [];

                    if (this.dataTable) {
                        this.dataTable.clear().rows.add(this.data).draw();
                    }
                },
                error: (error) => {
                    console.error("Error al cargar datos:", error);
                }
            });
        },
        cargarDatatabletsInicial() {

            this.generarColumnas();

            const tableRef = this.$refs['dataTable__' + this.tabla];

            this.dataTable = $(tableRef).DataTable({
                data: this.data,
                columns: this.columns,
                language: languageOptions,
                ...options__4,
                scrollX: false,
                autoWidth: false,
            });

            this.cargarData();
        },
        handleRowClick2(objeto, templateHtml) {
            Swal.fire({
                title: '<h1 class="uppercase text-sm">EDITAR ' + objeto.nombre + '</h1>',
                html: templateHtml,
                showConfirmButton: false,
                showCloseButton: true,
                closeButtonHtml: '<i class="fas fa-times"></i>',
                showCancelButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    this.llenarFormulario(objeto);
                }
            });
        },
        agregarEventosBotones() {
            
            $(this.$refs['dataTable__' + this.tabla]).off('click', '.btn-editar').on('click', '.btn-editar', (event) => {
                
                const row = $(event.currentTarget).closest('tr');
                const rowData = this.dataTable.row(row).data(); 

                const obj = rowData;
                const templateHtml = document.querySelector('.contenedor__modal_informacion').innerHTML;
                this.handleRowClick2(obj, templateHtml);

            });

            
            $(this.$refs['dataTable__' + this.tabla]).off('click', '.btn-eliminar').on('click', '.btn-eliminar', (event) => {
                const id = $(event.currentTarget).data('id');
                this.eliminarRegistro(id);
            });
        },
        llenarFormulario(objeto) {
            
            const nombreEditar = Swal.getHtmlContainer().querySelector('#nombreEditar');
            nombreEditar.value = objeto.nombre;
        
        
            const ingresarInformacionEditar = Swal.getHtmlContainer().querySelector('#ingresarInformacionEditar');
        
            ingresarInformacionEditar.addEventListener('click', (e) => {
                e.preventDefault();
                
                this.enviarInformacionEditar(nombreEditar, objeto.id, this.tabla);
            });
        },
        
        enviarInformacionEditar(nombreEditar, idRegistro, tabla) {
            const parametros = [
                nombreEditar.value,
                localStorage.getItem('idCredencial'),
                idRegistro,
                tabla
            ];

            forkJoin([
                observableAxios__editarInformacion(...parametros)
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
        eliminarRegistro(id) {

            Swal.fire({
                title: "Está seguro de cambiar el estado del registro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si"
              }).then((result) => {
                if (result.isConfirmed) {

                  forkJoin([observableAxios__eliminar(id,this.tabla)]).subscribe({
                    next: (results) => {

                        this.mensaje = results[0].mensaje;

                        if(parseInt(this.mensaje,10)===1){

                            
                            Swal.fire({
                                title: "Actualizado!",
                                text: "El estado fue actualizado correctamente.",
                                icon: "success"
                            });

                            this.cargarData();

                        }
                    },
                    error: (error) => {
                        console.error("Error al cargar datos:", error);
                    }
                  });
                }
              });

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
            }else{
                tablaConsulta = tabla;
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
    }
};
