import { Observable } from "rxjs";
import axios from 'axios';

const Ingreso = () => import("@/views/Auth_ingreso.vue");

export async function getToken(idUsuarioGloal, nombreRolGloal, usuarioGloal, tokenGloal) {
  let paqueteDeDatos = new FormData();
  paqueteDeDatos.append("idUsuarioGloal", idUsuarioGloal);
  paqueteDeDatos.append("nombreRolGloal", nombreRolGloal);
  paqueteDeDatos.append("usuarioGloal", usuarioGloal);
  paqueteDeDatos.append("tokenGloal", tokenGloal);

  const observableAxios__auth = new Observable((observer) => {
    axios({
      method: "post",
      url: process.env.VUE_APP_URL_AXIOS + 'midleware',
      data: paqueteDeDatos,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      observer.next(response.data);
      observer.complete();
    }).catch((error) => {
      observer.error(error);
    });
  });

  observableAxios__auth.subscribe({
    next: (data) => {},
    complete: () => {},
  });
}

export const miMiddleware = (to, from, next) => {
  const idUsuarioGloal = localStorage.getItem('idUsuario');
  const nombreRolGloal = localStorage.getItem('nombreRol');
  const usuarioGloal = localStorage.getItem('usuario');
  const tokenGloal = localStorage.getItem('token');

  if (idUsuarioGloal) {
    getToken(idUsuarioGloal, nombreRolGloal, usuarioGloal, tokenGloal);
    next();
  } else {
    next('/ingreso'); 
  }
};

export async function obtenerRutas() {
  return new Promise((resolve, reject) => {
    let paqueteDeDatos = new FormData();
    
    const observableAxios__auth = new Observable((observer) => {
      axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'interfazGeneral',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });

    observableAxios__auth.subscribe({
      next: (data) => resolve(data.interfazGeneral),
      error: (error) => reject(error),
    });
  });
}

export async function obtenerDatosDeRutas() {
  try {
    const datos = await obtenerRutas();

    const routes = [
      { path: "/", name: "/", redirect: "/ingreso" },
      { path: "/ingreso", name: "Ingreso", component: Ingreso },
      { path: "/salir", name: "salir" },
      { path: "/:pathMatch(.*)*", redirect: "/ingreso" },
    ];
    
    datos.forEach(route => {
      route.props = true;
      routes.push(route);
    });

    return routes;
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
  }
}

export function obtenerValorPorNombre(nombreClave, componentes) {
  for (let objeto of componentes) {
    if (objeto.hasOwnProperty(nombreClave)) {
      return objeto[nombreClave];
    }
  }
  return null;
}

export async function obtenerRutas__menus() {
  return new Promise((resolve, reject) => {
    let paqueteDeDatos = new FormData();
    paqueteDeDatos.append("idUsuario", localStorage.getItem("idUsuario"));

    const observableAxios__auth = new Observable((observer) => {
      axios({
        method: "post",
        url: process.env.VUE_APP_URL_AXIOS + 'menus__dinamicos',
        data: paqueteDeDatos,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        observer.next(response.data);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });

    observableAxios__auth.subscribe({
      next: (data) => resolve(data.menu),
      error: (error) => reject(error),
    });
  });
}

export async function rutasMenu() {
  try {
    return await obtenerRutas__menus();
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
  }
}
