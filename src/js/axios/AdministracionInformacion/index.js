import axios from "axios";
import { Observable} from "rxjs";

export const observableAxios__visualizar = (tabla) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("tabla", tabla);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'visualizar__Informacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__visualizar_selector = (tabla) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append("tabla", tabla);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'visualizar__Informacion_Selectores',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__ingresar = (formData,idCredencial,tabla) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        paqueteDeDatos.append(key, value);
    });

    paqueteDeDatos.append('rolArray', JSON.stringify(formData.rol));
    paqueteDeDatos.append('idCredencial', idCredencial);
    paqueteDeDatos.append('tabla', tabla);

    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'ingresarInformacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});


export const observableAxios__eliminar = (id,tabla) => new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    // Object.entries(formData).forEach(([key, value]) => {
    //     paqueteDeDatos.append(key, value);
    // });


    paqueteDeDatos.append('id', id);
    paqueteDeDatos.append('tabla', tabla);
    
    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'eliminar__Informacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });

  
});

export const observableAxios__editarInformacion = (nombre, idCredencial, id, tabla) => 
    new Observable((observer) => {

    let paqueteDeDatos = new FormData();

    paqueteDeDatos.append('nombre', nombre);
    paqueteDeDatos.append('idCredencial', idCredencial);
    paqueteDeDatos.append('id', id);
    paqueteDeDatos.append('tabla', tabla);

    axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'editar__Informacion',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        observer.next(response.data);
        observer.complete();
    }).catch((error) => {
        observer.error(error);
    });
});

