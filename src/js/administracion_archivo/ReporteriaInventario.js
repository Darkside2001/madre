import { forkJoin } from "rxjs";
import { observableAxios__generalInventario, observableAxios__parametrosInventario__ingreso__id, observableAxios__obtenerSecciones, observableAxios__obtenerSubsecciones__sin, observableAxios__archivos,observableAxios__informacion__roles__principales,observableAxios__obtenerFondo,observableAxios__fondos } from '@/js/axios/index.js';
import Swal from 'sweetalert2';
import { mensajeSatisfactorio} from '@/js/validaciones/formularios/funcionesObligatorios.js';

export default {
  name: "ReporteriaInventario",
  data() {
    return {
      formData: {
        fondo:'',
        destino:'',
      },
      fondosDisponibles: [],
      destinosDisponibles: [],
      columns: [
        { data: 'fondo', title: 'FONDO', className: 'text-center text-xs' },
        { data: 'seccion', title: 'SECCIÓN', className: 'text-center text-xs' },
        { data: 'subSeccion', title: 'SUB SECCION', className: 'text-center text-xs' },
        { data: 'serieSubserie', title: 'NOMBRE DE LA SERIE / SUB SERIE', className: 'text-center text-xs' },
        { data: 'descripcionDocumento', title: 'DESCRIPCIÓN DEL DOCUMENTO', className: 'text-center text-xs' },
        { data: 'descriptoresDelDocumento', title: 'DESCRIPTORES DEL DOCUMENTO', className: 'text-center text-xs' },
        { data: 'fechaApertura', title: 'FECHA DE APERTURA', className: 'text-center text-xs' },
        { data: 'fechaCierre', title: 'FECHA DE CIERRE', className: 'text-center text-xs' },
        { data: 'numeroFojas', title: 'N° DE FOLIOS', className: 'text-center text-xs' },
        { data: 'frecuenciaConsulta', title: 'FRECUENCIA DE CONSULTA', className: 'text-center text-xs' },
        { data: 'destinoFinal', title: 'DESTINO FINAL', className: 'text-center text-xs' },
        { data: 'unidadesConservacion', title: 'UNIDADES DE CONSERVACIÓN', className: 'text-center text-xs' },
        { data: 'numeroCarpetaFisica', title: 'No. CARPETA FÍSICA', className: 'text-center text-xs' },
        { data: 'caja', title: 'No. CAJA', className: 'text-center text-xs' },
        { data: 'tipoInventario', title: 'TIPO DE INVENTARIO', className: 'text-center text-xs' },
        { data: 'nivelInventario', title: 'NIVEL DE INVENTARIO', className: 'text-center text-xs' },
        { data: 'tipoTransferencia', title: 'TIPO DE TRANSFERENCIA', className: 'text-center text-xs' },
        { data: 'zona', title: 'ZONA', className: 'text-center text-xs' },
        { data: 'bandeja', title: 'No. DE BANDEJA', className: 'text-center text-xs' },
        { data: 'estanteria', title: 'No. ESTANTE', className: 'text-center text-xs' },
        { data: 'soporte', title: 'TIPO DE SOPORTE', className: 'text-center text-xs' },
        { data: 'tipoAcceso', title: 'TIPO DE ACCESO A LA INFORMACIÓN', className: 'text-center text-xs' },
        { data: 'estadoDocumento', title: 'ESTADO DE CONSERVACIÓN', className: 'text-center text-xs' },
        { data: 'indicadoresDeterioros', title: 'INDICADORES DE DETERIORO', className: 'text-center text-xs' },
        { data: 'observaciones', title: 'OBSERVACIONES', className: 'text-center text-xs' },
      ],
      data: [],
      unidadesConservacion:[
        {id: 'CARPETA FISICA', nombre: 'CARPETA FISICA'},
        {id: 'LEGAJO', nombre: 'LEGAJO'},
        {id: 'LIBRO', nombre: 'LIBRO'},
      ],
      tipoInventario:[
        {id: 'GENERAL', nombre: 'GENERAL'},
        {id: 'TRANSFERENCIA', nombre: 'TRANSFERENCIA'},
        {id: 'ELIMINACION', nombre: 'ELIMINACION'},
      ],
      nivelInventario:[
        {id: 'SERIE', nombre: 'SERIE'},
        {id: 'SUB SERIE', nombre: 'SUB SERIE'},
        {id: 'EXPEDIENTE', nombre: 'EXPEDIENTE'},
      ],
      tipoTransferencia:[
        {id: 'PRIMARIA', nombre: 'PRIMARIA'},
        {id: 'SECUNDARIA', nombre: 'SECUNDARIA'},
        {id: 'FINAL', nombre: 'FINAL'},
      ],
      tipoAcceso:[
        {id: 'PUBLICO', nombre: 'PUBLICO'},
        {id: 'CONFIDENCIAL', nombre: 'CONFIDENCIAL'},
        {id: 'RESERVADO', nombre: 'RESERVADO'},
      ],
      estadoDocumento:[
        {id: 'BUENO', nombre: 'BUENO'},
        {id: 'REGULAR', nombre: 'REGULAR'},
        {id: 'MALO', nombre: 'MALO'},
      ],
      indicadoresDeterioros:[
        {id: 'QUIMICO', nombre: 'QUIMICO'},
        {id: 'BIOLOGICO', nombre: 'BIOLOGICO'},
        {id: 'FISICO', nombre: 'FISICO'},
      ],
    };
  },
  mounted() {
    this.cargarDatatabletsInicial();
    this.obtener__fondos();
  },
  methods: {
    cargarData() {
      forkJoin([observableAxios__generalInventario()]).subscribe({
        next: (results) => {
          const data = results[0].informacion;
          this.data = data;
          this.dataTable.clear().rows.add(this.data).draw();
        },
        error: (error) => {
          console.error(error);
        }
      });
    },
    cargarDatatabletsInicial() {
      forkJoin([observableAxios__informacion__roles__principales(localStorage.getItem('idCredencial'))]).subscribe({
        next: (results) => {

          const informacion = results[0].informacion;
          

          if (Array.isArray(informacion) && informacion.length > 0 && informacion.some(num => num.toString() === "3" || num.toString() === "2")) {

            this.dataTable = $(this.$refs.dataTable__recibidos).DataTable({
              data: this.data,
              columns: this.columns,
              scrollX: true, 
              scrollY: "50vh",
              autoWidth: false, 
              paging: true, 
              searching: true, 
              lengthMenu: [10, 25, 50, 100],
              order: [],
              language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros por página",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                paginate: {
                  first: "Primero",
                  last: "Último",
                  next: "Siguiente",
                  previous: "Anterior"
                },
              },
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

          } else {
            this.dataTable = $(this.$refs.dataTable__recibidos).DataTable({
              data: this.data,
              columns: this.columns,
              scrollX: true, 
              scrollY: "50vh",
              autoWidth: false, 
              paging: true, 
              searching: true, 
              lengthMenu: [10, 25, 50, 100],
              order: [],
              language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros por página",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                paginate: {
                  first: "Primero",
                  last: "Último",
                  next: "Siguiente",
                  previous: "Anterior"
                },
              },
            });

          }
    
          this.cargarData();

        },
        error: (error) => {
          console.error(error);
        }
      });

    },
    handleRowClick(objeto, templateHtml) {
      Swal.fire({
        title: '',
        html: templateHtml,
        showConfirmButton: false,
        showCloseButton: true,
        closeButtonHtml: '<i class="fas fa-times"></i>',
        showCancelButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          this.llenarFormulario(objeto);

          console.log(objeto);
          
        }
      });
    },
    llenarFormulario(objeto) {
      forkJoin([observableAxios__parametrosInventario__ingreso__id("parametros_caja", "parametros_destino", "parametros_soporte", "parametros_zona", "parametros_estanteria", "parametros_bandeja")]).subscribe({
        next: (results) => {

          const fondo = Swal.getHtmlContainer().querySelector('#fondo');
          this.llenarFondo(fondo, objeto.idFondo);


          const seccion = Swal.getHtmlContainer().querySelector('#seccion');
          this.llenarSecciones(seccion, objeto.idSeccion);

          const subseccion = Swal.getHtmlContainer().querySelector('#subseccion');
          this.llenarSubsecciones(subseccion, objeto.idSubseccion);

          const serieSubserie = Swal.getHtmlContainer().querySelector('#serieSubserie');
          serieSubserie.value = objeto.serieSubserie;

          const descripcion = Swal.getHtmlContainer().querySelector('#descripcion');
          descripcion.value = objeto.descripcionDocumento;

          const descriptoresDelDocumento = Swal.getHtmlContainer().querySelector('#descriptoresDelDocumento');
          descriptoresDelDocumento.value = objeto.descriptoresDelDocumento;

          const fechaApertura = Swal.getHtmlContainer().querySelector('#fechaApertura');
          fechaApertura.value = this.formatDate(objeto.fechaApertura);

          const fechaCierre = Swal.getHtmlContainer().querySelector('#fechaCierre');
          fechaCierre.value = this.formatDate(objeto.fechaCierre);

          const numeroFojas = Swal.getHtmlContainer().querySelector('#numeroFojas');
          numeroFojas.value = objeto.numeroFojas;

          const frecuenciaConsulta = Swal.getHtmlContainer().querySelector('#frecuenciaConsulta');
          frecuenciaConsulta.value = objeto.frecuenciaConsulta;

          const destinoObjeto = Swal.getHtmlContainer().querySelector('#destino');
          const destino = results[0].destino;
          this.llenarGlobal(destinoObjeto, destino, objeto.idDestino, 'destino');

          const unidadesConservacionObjeto = Swal.getHtmlContainer().querySelector('#unidadesConservacion');
          const unidadesConservacion = this.unidadesConservacion;
          this.llenarGlobal(unidadesConservacionObjeto, unidadesConservacion, objeto.unidadesConservacion, 'unidad de conservación');

          const numeroCarpetaFisica = Swal.getHtmlContainer().querySelector('#numeroCarpetaFisica');
          numeroCarpetaFisica.value = objeto.numeroCarpetaFisica;

          const cajaObjeto = Swal.getHtmlContainer().querySelector('#caja');
          const caja = results[0].caja;
          this.llenarGlobal(cajaObjeto, caja, objeto.idCaja, 'caja');

          const tipoInventarioObjeto = Swal.getHtmlContainer().querySelector('#tipoInventario');
          const tipoInventario = this.tipoInventario;
          this.llenarGlobal(tipoInventarioObjeto, tipoInventario, objeto.tipoInventario, 'tipo de inventario');

          const nivelInventarioObjeto = Swal.getHtmlContainer().querySelector('#nivelInventario');
          const nivelInventario = this.nivelInventario;
          this.llenarGlobal(nivelInventarioObjeto, nivelInventario, objeto.nivelInventario, 'nivel de inventario');

          const tipoTransferenciaObjeto = Swal.getHtmlContainer().querySelector('#tipoTransferencia');
          const tipoTransferencia = this.tipoTransferencia;
          this.llenarGlobal(tipoTransferenciaObjeto, tipoTransferencia, objeto.tipoTransferencia, 'tipo de transferencia');

          const zonaObjeto = Swal.getHtmlContainer().querySelector('#zona');
          const zona = results[0].zona;
          this.llenarGlobal(zonaObjeto, zona, objeto.idZona, 'zona');

          const bandejaObjeto = Swal.getHtmlContainer().querySelector('#bandeja');
          const bandeja = results[0].bandeja;
          this.llenarGlobal(bandejaObjeto, bandeja, objeto.idBandeja, 'bandeja');

          const estanteriaObjeto = Swal.getHtmlContainer().querySelector('#estanteria');
          const estanteria = results[0].estanteria;
          this.llenarGlobal(estanteriaObjeto, estanteria, objeto.idEstanteria, 'estante');


          const soporteObjeto = Swal.getHtmlContainer().querySelector('#soporte');
          const soporte = results[0].soporte;
          this.llenarGlobal(soporteObjeto, soporte, objeto.idSoporte, 'soporte');

          const tipoAccesoObjeto = Swal.getHtmlContainer().querySelector('#tipoAcceso');
          const tipoAcceso = this.tipoAcceso;
          this.llenarGlobal(tipoAccesoObjeto, tipoAcceso, objeto.tipoAcceso, 'tipo de acceso');

          const estadoDocumentoObjeto = Swal.getHtmlContainer().querySelector('#estadoDocumento');
          const estadoDocumento = this.estadoDocumento;
          this.llenarGlobal(estadoDocumentoObjeto, estadoDocumento, objeto.estadoDocumento, 'estado de conservación');

          const indicadoresDeteriorosObjeto = Swal.getHtmlContainer().querySelector('#indicadoresDeterioros');
          const indicadoresDeterioros = this.indicadoresDeterioros;
          this.llenarGlobal(indicadoresDeteriorosObjeto, indicadoresDeterioros, objeto.indicadoresDeterioros, 'indicador de deterioro');

          const observaciones = Swal.getHtmlContainer().querySelector('#observaciones');
          observaciones.value = objeto.observaciones;


          const ingresarInformacion = Swal.getHtmlContainer().querySelector('#ingresarInformacion');

          ingresarInformacion.addEventListener('click', (event) => {
            event.preventDefault();
            this.enviarInformacion(fondo,seccion, subseccion, serieSubserie , descripcion,descriptoresDelDocumento,fechaApertura, fechaCierre,numeroFojas,frecuenciaConsulta,destinoObjeto,unidadesConservacionObjeto,numeroCarpetaFisica, cajaObjeto, tipoInventarioObjeto, nivelInventarioObjeto, tipoTransferenciaObjeto, zonaObjeto,bandejaObjeto,estanteriaObjeto,soporteObjeto,tipoAccesoObjeto,estadoDocumentoObjeto,indicadoresDeteriorosObjeto,observaciones, objeto.id);
          });

        },
        error: (error) => {
          console.error("Error obteniendo parámetros:", error);
        },
      });
    },
    enviarInformacion(fondo,seccion, subseccion, serieSubserie , descripcion,descriptoresDelDocumento,fechaApertura, fechaCierre,numeroFojas,frecuenciaConsulta,destinoObjeto,unidadesConservacionObjeto,numeroCarpetaFisica, cajaObjeto, tipoInventarioObjeto, nivelInventarioObjeto, tipoTransferenciaObjeto, zonaObjeto,bandejaObjeto,estanteriaObjeto,soporteObjeto,tipoAccesoObjeto,estadoDocumentoObjeto,indicadoresDeteriorosObjeto,observaciones, id) {
      forkJoin([
        observableAxios__archivos(
          fondo.value,seccion.value, subseccion.value, serieSubserie.value , descripcion.value,descriptoresDelDocumento.value,fechaApertura.value, fechaCierre.value,numeroFojas.value,frecuenciaConsulta.value,destinoObjeto.value,unidadesConservacionObjeto.value,numeroCarpetaFisica.value, cajaObjeto.value, tipoInventarioObjeto.value, nivelInventarioObjeto.value, tipoTransferenciaObjeto.value, zonaObjeto.value,bandejaObjeto.value,estanteriaObjeto.value,soporteObjeto.value,tipoAccesoObjeto.value,estadoDocumentoObjeto.value,indicadoresDeteriorosObjeto.value,observaciones.value,id
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
    llenarGlobal(selector, valores, valor, parametro) {

      selector.innerHTML = '';

      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '--Seleccione una ' + parametro + "--";
      selector.appendChild(defaultOption);

      valores.forEach(elemento => {
        const option = document.createElement('option');
        option.value = elemento.id;
        option.textContent = elemento.nombre;
        selector.appendChild(option);
      });

      selector.value = valor;

    },
    llenarSubsecciones(subseccion, idSubseccion) {
      forkJoin([observableAxios__obtenerSubsecciones__sin()]).subscribe({
        next: (results) => {
          const informacion = results[0].informacion;

          subseccion.innerHTML = '';

          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '--Seleccione una subsección--';
          subseccion.appendChild(defaultOption);

          informacion.forEach(elemento => {
            const option = document.createElement('option');
            option.value = elemento.id;
            option.textContent = elemento.nombre;
            subseccion.appendChild(option);
          });

          subseccion.value = idSubseccion;

        },
        error: (error) => {
          console.error(error);
        }
      });
    },
    llenarFondo(seccion, idSeccion) {
      forkJoin([observableAxios__obtenerFondo()]).subscribe({
        next: (results) => {
          const informacion = results[0].informacion;

          seccion.innerHTML = '';

          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '--Seleccione un fondo--';
          seccion.appendChild(defaultOption);

          informacion.forEach(elemento => {
            const option = document.createElement('option');
            option.value = elemento.id;
            option.textContent = elemento.nombre;
            seccion.appendChild(option);
          });

          seccion.value = idSeccion;

        },
        error: (error) => {
          console.error(error);
        }
      });
    },
    llenarSecciones(seccion, idSeccion) {
      forkJoin([observableAxios__obtenerSecciones()]).subscribe({
        next: (results) => {
          const informacion = results[0].informacion;

          seccion.innerHTML = '';

          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '--Seleccione una sección--';
          seccion.appendChild(defaultOption);

          informacion.forEach(elemento => {
            const option = document.createElement('option');
            option.value = elemento.id;
            option.textContent = elemento.nombre;
            seccion.appendChild(option);
          });

          seccion.value = idSeccion;

        },
        error: (error) => {
          console.error(error);
        }
      });
    },
    formatDate(dateString) {
      const [day, month, year] = dateString.split('-');
      return `${year}-${month}-${day}`;
    },
    obtener__fondos() {
      forkJoin([observableAxios__fondos()]).subscribe({
          next: (results) => {
              this.fondosDisponibles = results[0].informacion;
              // if (parseInt(parametro, 10) !== 0) {
              //     this.$nextTick(() => { this.formData.fondo = parametro; });
              // }
          },
          error: (error) => { console.error("Error obteniendo secciones:", error); }
      });
    },
    obtener__destino() {
      forkJoin([observableAxios__fondos()]).subscribe({
          next: (results) => {
              this.fondosDisponibles = results[0].informacion;
              // if (parseInt(parametro, 10) !== 0) {
              //     this.$nextTick(() => { this.formData.fondo = parametro; });
              // }
          },
          error: (error) => { console.error("Error obteniendo secciones:", error); }
      });
    },
  },
};
