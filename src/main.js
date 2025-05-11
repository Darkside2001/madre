import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;


import { createApp } from 'vue';


import App from './App.vue';
import store from "./store";
import router from "./router";
import Swal from 'sweetalert2';
import SoftUIDashboard from "./soft-ui-dashboard";

import './assets/main.css'; 
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import '@fortawesome/fontawesome-free/css/all.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import 'datatables.net';
import 'datatables.net-bs4/js/dataTables.bootstrap4.js';


import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'handsontable/dist/handsontable.full.css';


const app = createApp(App);

app.config.warnHandler = (msg, vm, trace) => {};

async function usarConfigurarRouter() {
    try {

      app.use(store);
      app.use(router);
      app.use(SoftUIDashboard);
      app.mount('#app');
    
     window.$swal = Swal;

    } catch (error) {
      console.error('Error al configurar el router:', error);
    }
  }
  
usarConfigurarRouter();



