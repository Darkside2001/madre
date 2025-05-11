<template>
  <!-- Si el texto es "Salir", utilizamos un botón en lugar de un router-link -->
  <div 
    v-if="navText === 'Salir'" 
    @click="handleClick"
    class="nav-link flex items-center gap-3 px-2 py-1 rounded-lg text-gray-700 hover:bg-blue-100 transition cursor-pointer justify-end"
  >
    <span class="nav-link-text text-xs uppercase flex-1 text-right">
      {{ navText }}
    </span>
    <span 
      class="nav-link-icon text-red-500 text-lg border border-gray-300 shadow-md p-3 rounded-full flex items-center justify-center w-8 h-8 ml-2"
    >
      <i :class="icon"></i>
    </span>
  </div>
  
  <router-link 
    v-else
    class="nav-link flex items-center gap-3 px-2 py-1 rounded-lg text-gray-700 hover:bg-blue-100 transition"
    :to="to" 
    v-bind="$attrs"
  >
    <span class="nav-link-icon text-blue-900 text-lg border border-gray-300 shadow-md p-3 rounded-full flex items-center justify-center w-8 h-8">
      <i :class="icon"></i>
    </span>
    <span class="nav-link-text text-xs uppercase flex-1 text-left">
      {{ navText }}
    </span>
  </router-link>
</template>

<script>
export default {
  name: "SidenavCollapse",
  props: {
    to: {
      type: [Object, String],
      default: null, // Para permitir botones sin redirección
    },
    navText: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "fas fa-box-open",
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');  // Emitimos el evento 'click' cuando es "Salir"
    }
  }
};
</script>
