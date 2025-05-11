<template>
  <main class="w-full flex flex-col items-center">
    
    <!-- Pestañas -->
    <div class="flex border-b border-gray-300">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index" 
        @click="activeTab = index"
        class="px-4 py-2 text-sm font-medium focus:outline-none"
        :class="activeTab === index ? 'text-blue-800 border-b-2 border-blue-800' : 'text-gray-600 hover:text-blue-600'"
      >
        {{ tab.name }}
      </button>
    </div>

    <!-- Contenido de las pestañas -->
    <div :class="['p-4 border border-gray-300 rounded-b-lg w-full transition-all', { 'h-screen': activeTab === 1, 'h-auto': activeTab !== 1 }]">
      <component :is="tabs[activeTab].component"></component>
    </div>

  </main>
</template>


<script>
import CrearUsuario from '@/components/CrearUsuarios/CrearUsuario.vue';
import ReporteriaUsuario from '@/components/CrearUsuarios/ReporteriaUsuario.vue';

export default {
  name: "UsuariosTabs",
  data() {
    return {
      activeTab: 0,
      tabs: [
        { name: "Ingresar Usuario", component: "CrearUsuario" },
        { name: "Editar Usuario", component: ReporteriaUsuario }
      ]
    };
  },
  components: {
    CrearUsuario
  }
};
</script>
