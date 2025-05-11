<template>
  <div class="w-full max-w-2xl space-y-10 mx-auto">
    <div v-for="(item, index) in items" :key="index" class="border rounded-lg">
      <button
        class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-t-lg flex justify-between items-center"
        @click="toggleAccordion(index, item, items)"
      >
        {{ item.title }}
        <span class="transform transition-transform" :class="openIndex === index ? 'rotate-180' : 'rotate-0'">
          ▼
        </span>
      </button>
      <div class="px-4 py-2 bg-white transition-all overflow-hidden" :class="openIndex === index ? 'block' : 'hidden'">
        <div>
          <div class="py-2">
            <component :is="item.component1" v-bind="item.props1" @accionExitosa="actualizarVisualizar(index)" :activo="openIndex === index" />
          </div>
          <div class="py-2" v-if="item.mostrarVisualizar">
            <component :is="item.component2" v-bind="item.props2" :key="item.key" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IngresarInformacion from '@/components/GestionarInformacion/IngresarInformacion.vue';
import VisualizarInformacion from '@/components/GestionarInformacion/VisualizarInformacion.vue';

export default {
  name: "GestionarInformacion",
  data() {
    return {
      openIndex: null,
      items: [
        {
          title: "Caja",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Caja",
            label: "Nombre Caja",
            placeholder: "Ingrese nombre de la caja",
            tabla: "caja",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "caja",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Destino",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Destino",
            label: "Nombre Destino",
            placeholder: "Ingrese nombre de Destino",
            tabla: "destino",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "destino",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Soporte",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Soporte",
            label: "Nombre Soporte",
            placeholder: "Ingrese nombre del Soporte",
            tabla: "soporte",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "soporte",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Zona",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Zona",
            label: "Nombre Zona",
            placeholder: "Ingrese nombre de la Zona",
            tabla: "zona",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "zona",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Estanteria",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Estanteria",
            label: "Nombre Estanteria",
            placeholder: "Ingrese nombre de la Estanteria",
            tabla: "estanteria",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "estanteria",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Bandeja",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Bandeja",
            label: "Nombre Bandeja",
            placeholder: "Ingrese nombre de la Bandeja",
            tabla: "bandeja",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "bandeja",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Seccion",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Seccion",
            label: "Nombre Seccion",
            placeholder: "Ingrese nombre de la Seccion",
            tabla: "seccion",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "seccion",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Subseccion",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Subseccion",
            label: "Nombre Subseccion",
            placeholder: "Ingrese nombre de la Subseccion",
            tabla: "subseccion",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "subseccion",
          },
          mostrarVisualizar: false,
          key: 0,
        },
        {
          title: "Fondos",
          component1: IngresarInformacion,
          props1: {
            title: "Crear Fondo",
            label: "Nombre Fondo",
            placeholder: "Ingrese nombre del fondo",
            tabla: "fondos",
          },
          component2: VisualizarInformacion,
          props2: {
            tabla: "fondos",
          },
          mostrarVisualizar: false,
          key: 0,
        },
      ]
    };
  },
  methods: {
    toggleAccordion(index, item,items) {
      this.openIndex = this.openIndex === index ? null : index;
      
      items.forEach((elem, i) => {
          elem.mostrarVisualizar = i === index; 
      });
    },
    actualizarVisualizar(index) {
      this.items[index].mostrarVisualizar = true; 
      this.items[index].key += 1; 
    }
  },
  components: {
    VisualizarInformacion
  }
};
</script>
