import Swal from 'sweetalert2';
import { forkJoin } from "rxjs";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/vue3";
import "handsontable/dist/handsontable.full.css";
import { observableAxios__obtenerSecciones, observableAxios__obtenerSubsecciones, observableAxios__guardarTablaSubsecciones, observableAxios__ingresado__pendientes, observableAxios__parametrosInventario__ingreso, observableAxios__ingresoTupla__inicial, observableAxios__obtenerIngresoInventarios, observableAxios__guardarInventarioDelDia,observableAxios__fondos } from '@/js/axios/index.js';
import { nextTick } from 'vue';


export default {
    name: "CargarInventario",
    components: {
        HotTable,
    },
    data() {
        return {
            formData: {
                seccion: '',
                subseccion: '',
                fondo:'',
            },
            visualizarSeccionVariable:false,
            habilitar: false,
            fondosDisponibles: [],
            seccionesDisponibles: [],
            subsebscionesDisponibles: [],
            dropdownCaja: [],
            dropdownDestinoFinal: [],
            dropdownSoporte: [],
            dropdownZona: [],
            dropdownEstanteria: [],
            dropdownBandeja: [],
            hotSettings: {
                data: Array.from({ length: 50 }, () => new Array(26).fill("")),
                colHeaders: [
                    "NOMBRE DE LA SERIE / SUB SERIE", "DESCRIPCIÓN DEL DOCUMENTO", "DESCRIPTORES DEL DOCUMENTO", "FECHA DE APERTURA", "FECHA DE CIERRE", "N° DE FOLIOS", "FRECUENCIA DE CONSULTA", "DESTINO FINAL", "UNIDADES DE CONSERVACIÓN", "No. CARPETA FÍSICA", "N° CAJA", "TIPO DE INVENTARIO", "NIVEL DE INVENTARIO", "TIPO DE TRANSFERENCIA", "ZONA", "No. DE BANDEJA", "No. ESTANTE", "TIPO DE SOPORTE", "TIPO DE ACCESO A LA INFORMACIÓN", "ESTADO DE CONSERVACIÓN", "INDICADORES DE DETERIORO", "OBSERVACIONES"
                ],
                rowHeaders: true,
                columns: [
                    { type: "text", width: 120, className: "center-text" },
                    { type: "text", width: 120, className: "text-left" },
                    { type: "text", width: 120, className: "text-left" },
                    { type: 'date', width: 100, dateFormat: 'DD-MM-YYYY', correctFormat: true, editor: 'date', allowInvalid: false, defaultDate: '01-01-2025', className: "center-text", datePickerConfig: { firstDay: 1, format: "DD-MM-YYYY", yearRange: [1960, new Date().getFullYear()] } },
                    { type: 'date', width: 100, dateFormat: 'DD-MM-YYYY', correctFormat: true, editor: 'date', allowInvalid: false, defaultDate: '01-01-2025', className: "center-text", datePickerConfig: { firstDay: 1, format: "DD-MM-YYYY", yearRange: [1960, new Date().getFullYear()] } },
                    { type: "numeric", width: 80, validator: (value, callback) => callback(value === "" || value <= 1000000), className: "center-text" },
                    { type: "text", width: 120, className: "center-text" },
                    { type: "dropdown", source: () => this.dropdownDestinoFinal, width: 100, className: "center-text" },
                    { type: "dropdown", source: ["CARPETA FISICA", "LEGAJO", "LIBRO"], className: "center-text" },
                    { type: "numeric", width: 80, validator: (value, callback) => callback(value === "" || value <= 1000000), className: "center-text" },
                    { type: "dropdown", source: () => this.dropdownCaja, width: 80, className: "center-text" },
                    { type: "dropdown", source: ["GENERAL", "TRANSFERENCIA", "ELIMINACION"], className: "center-text" },
                    { type: "dropdown", source: ["SERIE", "SUB SERIE", "EXPEDIENTE"], className: "center-text" },
                    { type: "dropdown", source: ["PRIMARIA", "SECUNDARIA", "FINAL"], className: "center-text" },
                    { type: "dropdown", source: () => this.dropdownZona, width: 100, className: "center-text" },
                    { type: "dropdown", source: () => this.dropdownBandeja, width: 100, className: "center-text" },
                    { type: "dropdown", source: () => this.dropdownEstanteria, width: 100, className: "center-text" },
                    { type: "dropdown", source: () => this.dropdownSoporte, width: 100, className: "center-text" },
                    { type: "dropdown", source: ["PUBLICO", "CONFIDENCIAL", "RESERVADO"], className: "center-text" },
                    { type: "dropdown", source: ["BUENO", "REGULAR", "MALO"], className: "center-text" },
                    { type: "dropdown", source: ["QUIMICO", "BIOLOGICO", "FISICO"], className: "center-text" },
                    { type: "text", width: 150 },
                ],
                stretchH: "all",
                minSpareRows: 10,
                licenseKey: "non-commercial-and-evaluation",
                filters: true, 
                dropdownMenu: false,
                contextMenu: true,
                autoWrapRow: true,
                autoWrapCol: true,
                colWidths: 120,
                afterGetColHeader: (col, TH) => {
                    TH.style.background = "#1f2937";
                    TH.style.color = "white";
                    TH.style.fontSize = "8px";
                },
                readOnly: false,
                afterChange: this.afterChange,
                beforeChange: this.beforeChange,
                beforePaste: (data, coords) => {
                    data.forEach((row, rowIndex) => {
                        row.forEach((cell, colIndex) => {
                            if ([3, 4].includes(coords[0].startCol + colIndex)) { 
                                const fecha = cell.split('/');
                                if (fecha.length === 3) {
                                    data[rowIndex][colIndex] = `${fecha[0]}-${fecha[1]}-${fecha[2]}`;
                                }
                            }
                        });
                    });
                }
            },            
            tableWidth: "100%",
            tableHeight: 600,
        };
    },
    mounted() {
        Handsontable.cellTypes.registerCellType('dropdown', Handsontable.cellTypes.dropdown);
        this.adjustTableHeight();
        this.obtener__principal__ingresado__pendiente();
        this.obtenerParametrosConfigurados();
        window.addEventListener('resize', this.adjustTableHeight);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.adjustTableHeight);
    },
    methods: {
        visualizarSeccion(){
            this.visualizarSeccionVariable = this.formData.fondo !== "";
        },
        eventoEnviar() {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Una vez enviado, no podrás modificar los registros.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, enviar',
                cancelButtonText: 'No',
                allowOutsideClick: false,
                allowEscapeKey: false,
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    forkJoin([observableAxios__guardarInventarioDelDia(localStorage.getItem("idCredencial"))])
                        .subscribe({
                            next: (results) => {
                                const mensaje = results[0].mensaje;
                                if (parseInt(mensaje, 10) === 1) {
                                    Swal.fire({
                                        title: 'Success',
                                        text: 'Registro enviado',
                                        icon: 'success',
                                        confirmButtonText: 'Aceptar',
                                        timer: 5000,
                                        timerProgressBar: true,
                                        allowOutsideClick: false,
                                        allowEscapeKey: false
                                    });

                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000);
                                } else {
                                    Swal.fire({
                                        title: 'Error',
                                        text: 'Obligatorio crear al menos un registro en el excel para poder enviar',
                                        icon: 'error',
                                        confirmButtonText: 'Aceptar',
                                        allowOutsideClick: false,
                                        allowEscapeKey: false
                                    });
                                }
                            },
                            error: (error) => {
                                console.error(error);
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Ocurrió un error inesperado',
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                });
                            }
                        });
                }
            });
        },
        enviarInformacion() {
            const rowsData = this.hotSettings.data.filter((row) =>
                row.slice(0, 12).every(cell => {
                    return (typeof cell === 'string' ? cell.trim() !== "" : cell !== null && cell !== undefined);
                })
            );

            let serieSubserieArray = [];
            let descripcionDocumentoArray = [];
            let descriptoresDelDocumentoArray = [];
            let aperturaArray = [];
            let cierreArray = [];
            let numeroHojasArray = [];
            let frecuenciaConsultaArray = [];
            let destinoFinalArray = [];
            let unidadesConservacionArray = [];
            let numeroCarpetaFisicaArray = [];
            let numeroCajaArray = [];
            let tipoInventarioArray = [];
            let nivelInventarioArray = [];
            let tipoTransferenciaArray = [];
            let zonaArray = [];
            let bandejaArray = [];
            let estanteriaArray = [];
            let soporteArray = [];
            let tipoAccesoInformacion = [];
            let estadosArray = [];
            let indicadoresDeterioros = [];
            let observacionesArray = [];

            rowsData.forEach((row) => {
                serieSubserieArray.push(row[0]);
                descripcionDocumentoArray.push(row[1]);
                descriptoresDelDocumentoArray.push(row[2]);
                aperturaArray.push(row[3]);
                cierreArray.push(row[4]);
                numeroHojasArray.push(row[5]);
                frecuenciaConsultaArray.push(row[6]);
                destinoFinalArray.push(row[7]);
                unidadesConservacionArray.push(row[8]);
                numeroCarpetaFisicaArray.push(row[9]);
                numeroCajaArray.push(row[10]);
                tipoInventarioArray.push(row[11]);
                nivelInventarioArray.push(row[12]);
                tipoTransferenciaArray.push(row[13]);
                zonaArray.push(row[14]);
                bandejaArray.push(row[15]);
                estanteriaArray.push(row[16]);
                soporteArray.push(row[17]);
                tipoAccesoInformacion.push(row[18]);
                estadosArray.push(row[19]);
                indicadoresDeterioros.push(row[20]);
                observacionesArray.push(row[21]);
            });


            forkJoin([observableAxios__ingresoTupla__inicial(localStorage.getItem("idCredencial"), serieSubserieArray, descripcionDocumentoArray, descriptoresDelDocumentoArray, aperturaArray, cierreArray, numeroHojasArray, frecuenciaConsultaArray, destinoFinalArray, unidadesConservacionArray, numeroCarpetaFisicaArray, numeroCajaArray, tipoInventarioArray,nivelInventarioArray, tipoTransferenciaArray,zonaArray,bandejaArray,estanteriaArray,soporteArray,tipoAccesoInformacion,estadosArray,indicadoresDeterioros,observacionesArray, this.formData.seccion, this.formData.subseccion, this.formData.fondo)]).subscribe({
                next: (results) => {



                },
                error: (error) => { console.error(error); }
            });

        },
        beforeChange: (changes) => {
            changes.forEach(change => {
                let [row, prop, oldValue, newValue] = change;

                if (typeof newValue === "string") {
                    change[3] = newValue
                        .toUpperCase() // Convertir a mayúsculas
                        .normalize("NFD") // Separar acentos
                        .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
                }
        

                if ([4, 5].includes(prop) && typeof newValue === 'string') {
                    let dateParts = newValue.split('/');

                    if (dateParts.length === 3) {
                        let [day, month, year] = dateParts.map(num => parseInt(num, 10));

                        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {

                            if (year < 100) year += 2000;

                            let formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                            change[3] = formattedDate; 
                        } else {
                            change[3] = '2025-01-01'; 
                        }
                    }
                }

            });
        },
        afterChange(changes, source) {
            if (changes) {
                const filasAfectadas = new Set();
        
                changes.forEach(([row, col, oldValue, newValue]) => {
                    filasAfectadas.add(row);
                });
        
                filasAfectadas.forEach(row => {
                    const rowData = this.hotSettings.data[row];
                    const relevantRowData = rowData.slice(0, 1);
        
                    const isRowEmpty = relevantRowData.every(cell => cell === "" || cell === null || cell === undefined);
                    const isRowFull = relevantRowData.every(cell => cell !== "" && cell !== null && cell !== undefined);

                    if ((isRowFull) || isRowEmpty) {
                        this.enviarInformacion();
                    }

                });
            }
        },
        adjustDropdownMenuWidth() {
            this.hotSettings.afterDropdownMenu = (row, col, prop, TD) => {
                const selectElement = TD.querySelector('select');
                if (selectElement) {
                    const dropdownMenu = selectElement.closest('.htDropdown').querySelector('.htDropdownMenu');
                    if (dropdownMenu) {
                        dropdownMenu.style.minWidth = '200px';
                    }
                }
            };
        },
        obtenerParametrosConfigurados() {
            forkJoin([observableAxios__parametrosInventario__ingreso("parametros_caja", "parametros_destino", "parametros_soporte", "parametros_zona", "parametros_estanteria", "parametros_bandeja")]).subscribe({
                next: (results) => {
                    const caja = results[0].caja;
                    this.dropdownCaja = caja.map(item => item.nombre);
                    const destino = results[0].destino;
                    this.dropdownDestinoFinal = destino.map(item => item.nombre);
                    const soporte = results[0].soporte;
                    this.dropdownSoporte = soporte.map(item => item.nombre);
                    const zona = results[0].zona;
                    this.dropdownZona = zona.map(item => item.nombre);
                    const estanteria = results[0].estanteria;
                    this.dropdownEstanteria = estanteria.map(item => item.nombre);
                    const bandeja = results[0].bandeja;
                    this.dropdownBandeja = bandeja.map(item => item.nombre);

                    this.$nextTick(() => {
                        this.hotSettings.columns[7].source = this.dropdownDestinoFinal;
                        this.hotSettings.columns[10].source = this.dropdownCaja;
                        this.hotSettings.columns[14].source = this.dropdownZona;
                        this.hotSettings.columns[15].source = this.dropdownBandeja;
                        this.hotSettings.columns[16].source = this.dropdownEstanteria;
                        this.hotSettings.columns[17].source = this.dropdownSoporte;
                       
                        this.adjustDropdownMenuWidth();
                    });
                },
                error: (error) => {
                    console.error("Error obteniendo parámetros:", error);
                },
            });
        },
        obtener__principal__ingresado__pendiente() {
            forkJoin([observableAxios__ingresado__pendientes(localStorage.getItem("idCredencial"))]).subscribe({
                next: (results) => {
                    const informacion = results[0].informacion;
                    if (informacion.length > 0) {
                        this.formData.seccion = informacion[0].idSeccion;
                        this.formData.fondo = informacion[0].idFondo;
                        this.visualizarSeccionVariable=true;
                        this.obtener__fondos(this.formData.fondo);
                        this.obtener__secciones(this.formData.seccion);
                        forkJoin([observableAxios__obtenerSubsecciones(this.formData.seccion), observableAxios__obtenerIngresoInventarios(localStorage.getItem("idCredencial"))]).subscribe({
                            next: (results) => {

                                this.subsebscionesDisponibles = results[0].informacion;
                                this.formData.subseccion = informacion[0].idSubseccion;
                                this.habilitar = true;

                                const informacionInventarioRegistrada = results[1].informacionCompleta;

                                this.hotSettings.data = [
                                    ...informacionInventarioRegistrada.map(item => [
                                        item.serieSubserie || "",
                                        item.descripcionDocumento || "",
                                        item.descriptoresDelDocumento || "",
                                        item.fechaApertura || "",
                                        item.fechaCierre || "",
                                        item.numeroFojas || "",
                                        item.frecuenciaConsulta || "",
                                        item.destinoFinal || "",
                                        item.unidadesConservacion || "",
                                        item.numeroCarpetaFisica || "",
                                        item.caja || "",
                                        item.tipoInventario || "",
                                        item.nivelInventario || "",
                                        item.tipoTransferencia || "",
                                        item.zona || "",
                                        item.bandeja || "",
                                        item.estanteria || "",
                                        item.soporte || "",
                                        item.tipoAcceso || "",
                                        item.estadoDocumento || "",
                                        item.indicadoresDeterioros || "",
                                        item.observaciones || "",
                                    ]),
                                    ...Array.from(
                                        { length: Math.max(1000 - informacionInventarioRegistrada.length, 10) },
                                        () => new Array(13).fill("")
                                    )
                                ];



                                this.$nextTick(() => {
                                    this.$refs.hotTable.hotInstance.render();
                                });

                            },
                            error: (error) => { console.error(error); }
                        });
                    } else {
                        this.obtener__secciones(0);
                        this.obtener__fondos(0);
                    }
                },
                error: (error) => { console.error(error); }
            });
        },
        guardarSeccionSubsecciones() {
            forkJoin([observableAxios__guardarTablaSubsecciones(this.formData.seccion, this.formData.subseccion, localStorage.getItem("idCredencial"),this.formData.fondo)]).subscribe({
                next: (results) => {
                    const mensaje = results[0].mensaje;
                    this.habilitar = (parseInt(mensaje, 10) === 1 && this.formData.subseccion !== "");
                },
                error: (error) => { console.error(error); }
            });
        },
        autocompletarSubseccion() {
            forkJoin([observableAxios__obtenerSubsecciones(this.formData.seccion)]).subscribe({
                next: (results) => { this.subsebscionesDisponibles = results[0].informacion; },
                error: (error) => { console.error(error); }
            });
        },
        obtener__secciones(parametro) {
            forkJoin([observableAxios__obtenerSecciones()]).subscribe({
                next: (results) => {
                    this.seccionesDisponibles = results[0].informacion;
                    if (parseInt(parametro, 10) !== 0) {
                        this.$nextTick(() => { this.formData.seccion = parametro; });
                    }
                },
                error: (error) => { console.error("Error obteniendo secciones:", error); }
            });
        },
        obtener__fondos(parametro) {
            forkJoin([observableAxios__fondos()]).subscribe({
                next: (results) => {
                    this.fondosDisponibles = results[0].informacion;
                    if (parseInt(parametro, 10) !== 0) {
                        this.$nextTick(() => { this.formData.fondo = parametro; });
                    }
                },
                error: (error) => { console.error("Error obteniendo secciones:", error); }
            });
        },
        adjustTableHeight() {
            if (window.innerWidth <= 768) {
                this.tableHeight = 200;
            } else {
                this.tableHeight = 450;
            }
        }
    }
};
