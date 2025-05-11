<template>
  <nav aria-label="breadcrumb" class="relative flex justify-between items-center">
    <!-- 📌 Breadcrumbs -->
    <div>
      <ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb">
        <li class="text-sm breadcrumb-item" :class="textWhite">
          <a 
            v-if="$store.state.isRTL"
            class="opacity-5 ps-2"
            href="#"
          >لوحات القيادة</a>
          <a v-else class="opacity-8">Menú</a> 
        </li>
        <li
          class="text-sm breadcrumb-item active"
          :class="textWhite ? 'text-white' : 'text-dark'"
          aria-current="page"
        >{{ currentPage }}</li>
      </ol>
      <h6 class="mb-0 font-weight-bolder" :class="textWhite ? 'text-white' : ''">
        {{ currentPage }}
      </h6>
    </div>

    <button 
      @click="toggleMenu" 
      class="md:hidden p-2 bg-white border border-gray-300 rounded-md shadow-lg text-gray-700 z-50 fixed top-4 right-4"
    >
      <i v-if="!menuAbierto" class="fa-solid fa-bars text-xl"></i>
      <i v-else class="fa-solid fa-xmark text-xl"></i>
    </button>

    <div 
      v-if="menuAbierto" 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      @click.self="toggleMenu"
    ></div>

    <div 
      v-if="visible===true"
      :class="menuAbierto ? 'translate-x-0' : '-translate-x-full'"
      class="fixed top-0 left-0 w-64 h-screen bg-blue-900 shadow-lg p-4 transition-transform duration-300 md:hidden rounded-lg z-50 text-white"
    >
      <ul class="space-y-1">
        <li 
          class="nav-item text-white"
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ 'bg-blue-700': isActive(item) }"
        >
          <sidenav-collapse 
            :nav-text="item.text" 
            :to="{ name: item.text }" 
            :icon="item.icon"
            class="text-white"
            @click="toggleMenu"
          />
        </li>

        <li class="nav-item text-white" v-if="isAuthenticated">
          <sidenav-collapse 
            nav-text="Salir" 
            icon="fa-solid fa-right-from-bracket"
            class="text-white"
            @click="salir"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { forkJoin } from "rxjs";
import SidenavCollapse from "@/examples/Sidenav/SidenavCollapse.vue";
import { observableAxios__salir, observableAxios__obtenerMenu } from '@/js/axios/index.js';

export default {
  name: "BreadcrumbsComponent",
  components: {
    SidenavCollapse,
  },
  props: {
    currentPage: {
      required: true,
      type: String,
      default: ""
    },
    textWhite: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      menuItems: [],
      menuAbierto: false,
      visible:false,
    };
  },
  computed: {
    isAuthenticated() {
      return localStorage.getItem("jwt") !== null;
    }
  },
  mounted() {
    this.menu();
  },
  methods: {
    menu() {
      forkJoin([observableAxios__obtenerMenu(localStorage.getItem("idCredencial"))]).subscribe({
        next: (results) => {
          this.menuItems = results[0].menu;
        },
        error: (error) => {
          console.error(error);
        },
      });
    },
    salir() {
      forkJoin([observableAxios__salir()]).subscribe({
        next: (results) => {
          const mensaje = results[0].mensaje;
          if (parseInt(mensaje, 10) === 1) {
            localStorage.clear();
            this.$router.push("/ingreso");
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    },
    isActive(item) {
      return this.$route.name === item.text;
    },
    toggleMenu() {
      this.menuAbierto = !this.menuAbierto;
      if(this.visible===true){
        this.visible=false;
      }else{
        this.visible=true;
      }
    },
  },
};
</script>
