import axios from "axios";
import { Observable} from "rxjs";

export const observableAxios__informacion__roles__principales = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'informacion__roles__principales',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__archivos = (fondo,seccion, subseccion, serieSubserie , descripcion,descriptoresDelDocumento,fechaApertura, fechaCierre,numeroFojas,frecuenciaConsulta,destinoObjeto,unidadesConservacionObjeto,numeroCarpetaFisica, cajaObjeto, tipoInventarioObjeto, nivelInventarioObjeto, tipoTransferenciaObjeto, zonaObjeto,bandejaObjeto,estanteriaObjeto,soporteObjeto,tipoAccesoObjeto,estadoDocumentoObjeto,indicadoresDeteriorosObjeto,observaciones, id) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("fondo", fondo);
    paqueteDeDatos.append("seccion", seccion);
    paqueteDeDatos.append("subseccion", subseccion);
    paqueteDeDatos.append("serieSubserie", serieSubserie);
    paqueteDeDatos.append("descripcion", descripcion);
    paqueteDeDatos.append("descriptoresDelDocumento", descriptoresDelDocumento);
    paqueteDeDatos.append("fechaApertura", fechaApertura);
    paqueteDeDatos.append("fechaCierre", fechaCierre);
    paqueteDeDatos.append("numeroFojas", numeroFojas);
    paqueteDeDatos.append("frecuenciaConsulta", frecuenciaConsulta);
    paqueteDeDatos.append("destinoObjeto", destinoObjeto);
    paqueteDeDatos.append("unidadesConservacionObjeto", unidadesConservacionObjeto);
    paqueteDeDatos.append("numeroCarpetaFisica", numeroCarpetaFisica);
    paqueteDeDatos.append("cajaObjeto", cajaObjeto);
    paqueteDeDatos.append("tipoInventarioObjeto", tipoInventarioObjeto);
    paqueteDeDatos.append("nivelInventarioObjeto", nivelInventarioObjeto);
    paqueteDeDatos.append("tipoTransferenciaObjeto", tipoTransferenciaObjeto);
    paqueteDeDatos.append("zonaObjeto", zonaObjeto);
    paqueteDeDatos.append("bandejaObjeto", bandejaObjeto);
    paqueteDeDatos.append("estanteriaObjeto", estanteriaObjeto);
    paqueteDeDatos.append("soporteObjeto", soporteObjeto);
    paqueteDeDatos.append("tipoAccesoObjeto", tipoAccesoObjeto);
    paqueteDeDatos.append("estadoDocumentoObjeto", estadoDocumentoObjeto);
    paqueteDeDatos.append("indicadoresDeteriorosObjeto", indicadoresDeteriorosObjeto);
    paqueteDeDatos.append("observaciones", observaciones);
    paqueteDeDatos.append("id", id);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'edicion__archivos',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});


export const observableAxios__generalInventario = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporteriaGeneral__inventario',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__editarUsuarios = (rolesAnidados,cedulaEditar,nombreEditar,correoEditar,celularEditar,direccionEditar,estadoEditar,idCredencial,idCredencialPersona) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("rolesAnidados", JSON.stringify(rolesAnidados));
    paqueteDeDatos.append("cedulaEditar", cedulaEditar);
    paqueteDeDatos.append("nombreEditar", nombreEditar);
    paqueteDeDatos.append("correoEditar", correoEditar);
    paqueteDeDatos.append("celularEditar", celularEditar);
    paqueteDeDatos.append("direccionEditar", direccionEditar);
    paqueteDeDatos.append("estadoEditar", estadoEditar);
    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("idCredencialPersona", idCredencialPersona);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'edicion__deUsuarios',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__guardarInventarioDelDia = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'guardar__registroDelDia',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerIngresoInventarios = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__ingresados__inventarios',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__ingresoTupla__inicial = (idCredencial, serieSubserieArray, descripcionDocumentoArray, descriptoresDelDocumentoArray, aperturaArray, cierreArray, numeroHojasArray, frecuenciaConsultaArray, destinoFinalArray, unidadesConservacionArray, numeroCarpetaFisicaArray, numeroCajaArray, tipoInventarioArray,nivelInventarioArray, tipoTransferenciaArray,zonaArray,bandejaArray,estanteriaArray,soporteArray,tipoAccesoInformacion,estadosArray,indicadoresDeterioros,observacionesArray,idSeccion,idSubseccion,fondo) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();
    console.log(fondo)
    paqueteDeDatos.append("fondo", fondo);
    paqueteDeDatos.append("idSeccion", idSeccion);
    paqueteDeDatos.append("idSubseccion", idSubseccion);
    paqueteDeDatos.append("serieSubserieArray", JSON.stringify(serieSubserieArray));
    paqueteDeDatos.append("descripcionDocumentoArray", JSON.stringify(descripcionDocumentoArray));
    paqueteDeDatos.append("descriptoresDelDocumentoArray", JSON.stringify(descriptoresDelDocumentoArray));
    paqueteDeDatos.append("aperturaArray", JSON.stringify(aperturaArray));
    paqueteDeDatos.append("cierreArray", JSON.stringify(cierreArray));
    paqueteDeDatos.append("numeroHojasArray", JSON.stringify(numeroHojasArray));
    paqueteDeDatos.append("frecuenciaConsultaArray", JSON.stringify(frecuenciaConsultaArray));
    paqueteDeDatos.append("destinoFinalArray", JSON.stringify(destinoFinalArray));
    paqueteDeDatos.append("unidadesConservacionArray", JSON.stringify(unidadesConservacionArray));
    paqueteDeDatos.append("numeroCarpetaFisicaArray", JSON.stringify(numeroCarpetaFisicaArray));
    paqueteDeDatos.append("numeroCajaArray", JSON.stringify(numeroCajaArray));
    paqueteDeDatos.append("tipoInventarioArray", JSON.stringify(tipoInventarioArray));
    paqueteDeDatos.append("nivelInventarioArray", JSON.stringify(nivelInventarioArray));
    paqueteDeDatos.append("tipoTransferenciaArray", JSON.stringify(tipoTransferenciaArray));
    paqueteDeDatos.append("zonaArray", JSON.stringify(zonaArray));
    paqueteDeDatos.append("bandejaArray", JSON.stringify(bandejaArray));
    paqueteDeDatos.append("estanteriaArray", JSON.stringify(estanteriaArray));
    paqueteDeDatos.append("soporteArray", JSON.stringify(soporteArray));
    paqueteDeDatos.append("tipoAccesoInformacion", JSON.stringify(tipoAccesoInformacion));
    paqueteDeDatos.append("estadosArray", JSON.stringify(estadosArray));
    paqueteDeDatos.append("indicadoresDeterioros", JSON.stringify(indicadoresDeterioros));
    paqueteDeDatos.append("observacionesArray", JSON.stringify(observacionesArray));
    paqueteDeDatos.append("idCredencial", idCredencial);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'ingresar__tuplaInicial__inventario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__parametrosInventario__ingreso__id = (tablaCaja,tablaDestino,tablaSoporte,tablaZona,tablaEstanteria,tablaBandeja) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("tablaCaja", tablaCaja);
    paqueteDeDatos.append("tablaDestino", tablaDestino);
    paqueteDeDatos.append("tablaSoporte", tablaSoporte);
    paqueteDeDatos.append("tablaZona", tablaZona);
    paqueteDeDatos.append("tablaEstanteria", tablaEstanteria);
    paqueteDeDatos.append("tablaBandeja", tablaBandeja);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__parametros__configuracion__id',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__parametrosInventario__ingreso = (tablaCaja,tablaDestino,tablaSoporte,tablaZona,tablaEstanteria,tablaBandeja) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("tablaCaja", tablaCaja);
    paqueteDeDatos.append("tablaDestino", tablaDestino);
    paqueteDeDatos.append("tablaSoporte", tablaSoporte);
    paqueteDeDatos.append("tablaZona", tablaZona);
    paqueteDeDatos.append("tablaEstanteria", tablaEstanteria);
    paqueteDeDatos.append("tablaBandeja", tablaBandeja);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__parametros__configuracion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__ingresado__pendientes = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__ingresados__pendientes',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__guardarTablaSubsecciones = (seccion,subseccion,idCredencial,fondo) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("seccion", seccion);
    paqueteDeDatos.append("subseccion", subseccion);
    paqueteDeDatos.append("idCredencial", idCredencial);
    paqueteDeDatos.append("fondo", fondo);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'guardar__secciones__subsecciones',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerSubsecciones__sin = () => new Observable((observer) => {
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__subseccion__sin',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerSubsecciones = (idSeccion) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idSeccion", idSeccion);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__subseccion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__fondos = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__fondos',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerFondo = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__fondo',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__obtenerSecciones = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'obtener__secciones',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__usuarios = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'reporte__usuarios',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__ingresarUsuario = (formData,idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });

    paqueteDeDatos.append('rolArray', JSON.stringify(formData.rol));
    paqueteDeDatos.append('idCredencial', idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'ingresarUsuario',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__obtenerRoles__editar = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'roles__discrecional__editar',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});


export const observableAxios__obtenerRoles = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'roles__discrecional',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__obtenerMenu = (idCredencial) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("idCredencial", idCredencial);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'menu',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__auth = (formData) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'auth',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__salir = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'salir',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});

export const observableAxios__interfacez = () => new Observable((observer) => {

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'interfazGeneral',
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

});
