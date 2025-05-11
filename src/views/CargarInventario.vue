<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex w-full sm:w-2/5 flex-col sm:flex-row sm:items-center sm:space-x-4">
      <!-- Contenedor de los selectores -->
      <div class="flex flex-col sm:flex-row flex-1 sm:space-x-4 space-y-3 sm:space-y-0">

        <!-- fondos -->
        <div class="flex flex-col flex-1">
          <div class="font-bold text-xs mb-1">Fondos</div>
          <select class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
            @change="visualizarSeccion" v-model="formData.fondo">
            <option value="">--Seleccione un fondo--</option>
            <option v-for="fondo in fondosDisponibles" :key="fondo.id" :value="fondo.id">
              {{ fondo.nombre }}
            </option>
          </select>
        </div>


        <!-- Sección -->
        <div class="flex flex-col flex-1" v-if="visualizarSeccionVariable===true">
          <div class="font-bold text-xs mb-1">Sección</div>
          <select class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
            @change="autocompletarSubseccion" v-model="formData.seccion">
            <option value="">--Seleccione una sección--</option>
            <option v-for="seccion in seccionesDisponibles" :key="seccion.id" :value="seccion.id">
              {{ seccion.nombre }}
            </option>
          </select>
        </div>

        <!-- Sub Sección -->
        <div class="flex flex-col flex-1" v-if="visualizarSeccionVariable===true">
          <div class="font-bold text-xs mb-1">Sub Sección</div>
          <select class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
            v-model="formData.subseccion" @change="guardarSeccionSubsecciones">
            <option value="">--Seleccione una subsección--</option>
            <option v-for="subseccion in subsebscionesDisponibles" :key="subseccion.id" :value="subseccion.id">
              {{ subseccion.nombre }}
            </option>
          </select>
        </div>
      </div>

      <!-- Botón -->
      <div class="w-full sm:w-auto mt-3 sm:mt-0" v-if="visualizarSeccionVariable===true">
        <button id="ingresar"
          class="w-full sm:w-auto bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm"
          @click="eventoEnviar">
          Enviar
        </button>
      </div>
    </div>
  </div>


  <div class="w-full flex flex-col" v-if="habilitar === true">

    <div class="w-full bg-gray-100 flex flex-col overflow-hidden" style="height: 100vh;">

      <div class="w-full overflow-x-auto bg-white shadow-md">
        <div class="w-[2600px] h-1 bg-transparent"></div>
      </div>

      <div class="flex-1 bg-white shadow-lg rounded-lg overflow-hidden" :style="{ height: tableHeight }">
        <HotTable ref="hotTable" :settings="hotSettings" class="w-full h-full" :width="tableWidth"
          :height="tableHeight" />
      </div>
    </div>
  </div>

</template>

<script>
import variable from '@/js/administracion_archivo/CargarInventario.js';
export default {
  name: "CargarInventario",
  mixins: [variable],
};
</script>
<style>
.center-text {
    text-align: center;
}
</style>