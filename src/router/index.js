import { createRouter, createWebHashHistory } from "vue-router";
import Ingreso from "@/views/Auth_ingreso.vue";
// import Madre from "@/views/Madre.vue";
import CargarInventario from "@/views/CargarInventario.vue";
import CrearUsuarios from "@/views/CrearUsuarios.vue";
import GestionarInformacion from "@/views/GestionarInformacion.vue";
import ReporteriaInventario from "@/views/ReporteriaInventario.vue";

function isAuthenticated() {

  const token = localStorage.getItem("jwt"); 
  if (!token) {
    return false; 
  }

  return true; 

}

const routes = [];

routes.push(
  {
    path: "/",
    name: "/",
    redirect: "/ingreso",
  },
  {
    path: "/ingreso",
    name: "Ingreso",
    component: Ingreso,
  },
  {
    path: "/cargar-inventario",
    name: "Cargar Inventario",
    component: CargarInventario,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/crear-usuarios",
    name: "Crear Usuarios",
    component: CrearUsuarios,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/gestionar-informacion",
    name: "Gestionar Informacion",
    component: GestionarInformacion,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
  {
    path: "/reporteria-inventario",
    name: "Reporteria Inventario",
    component: ReporteriaInventario,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ name: "Ingreso" });
      } else {
        next();
      }
    },
  },
);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});


export default router;
