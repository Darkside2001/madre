<template>
  <div
    id="sidenav-collapse-main"
    class="w-auto h-auto max-h-screen overflow-y-auto bg-gray-100 shadow-lg rounded-lg p-1"
  >
    <ul class="space-y-1">
      <li
        class="nav-item"
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{
          'bg-blue-100 text-black': isActive(item),
        }"
      >
        <sidenav-collapse 
          :nav-text="item.text" 
          :to="{ name: item.text }" 
          :icon="item.icon"
        />
      </li>

      <li class="nav-item" v-if="isAuthenticated">
        <sidenav-collapse 
          nav-text="Salir" 
          icon="fa-solid fa-right-from-bracket"
          @click="salir"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { forkJoin } from "rxjs";
import SidenavCollapse from "./SidenavCollapse.vue";
import { observableAxios__salir, observableAxios__obtenerMenu } from '@/js/axios/index.js';

export default {
  name: "SidenavList",
  components: {
    SidenavCollapse,
  },
  data() {
    return {
      menuItems: [],
    };
  },
  computed: {
    // Computed property to check if the user is authenticated
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
      // Check if the current route's name matches the item's text (assuming the route name corresponds to the menu text)
      return this.$route.name === item.text;
    },
  },
};
</script>
