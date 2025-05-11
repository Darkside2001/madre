<template>
  <ButtonExcel :data="data" :dataTable="dataTable" :slice="26"/>
  <div class="w-full flex flex-col items-center">
    <div class="flex w-full sm:w-2/5 flex-col sm:flex-row sm:items-center sm:space-x-4">
      <!-- Contenedor de los selectores -->
      <div class="flex flex-col sm:flex-row flex-1 sm:space-x-4 space-y-3 sm:space-y-0">

        <!-- fondos -->
        <div class="flex flex-col flex-1">
          <div class="font-bold text-xs mb-1">Fondos</div>
          <select class="w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
            v-model="formData.fondo">
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

  <main class="w-full flex flex-col items-center">
    <div class="w-full">
      <!-- Contenedor con scroll horizontal -->
      <div>
        <table ref="dataTable__recibidos" class="display w-full text-sm text-gray-700 border border-gray-200"></table>
      </div>
    </div>
  </main>


  <div class="hidden contenedor__modal">

    <div class="flex flex-col w-full text-bold text-center items-center">

      <form id="formulario" ref="formulario" role="form" class="w-full text-start">

        <button id="ingresarInformacion"
          class="mt-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm">
          Guardar
        </button>
        
        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">Fondo</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="fondo">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">Sección</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="seccion">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">Sub sección</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="subseccion">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">SERIE SUBSERIE/DOCUMENTAL</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese serie subserie documental" id="serieSubserie" />
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">DESCRIPCIÓN DEL DOCUMENTO</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese descripción del documento" id="descripcion" />
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">DESCRIPTORES DEL DOCUMENTO</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese descriptores del documento" id="descriptoresDelDocumento" />
        </div>


        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">FECHA APERTURA</label>
          <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            id="fechaApertura" />
        </div>


        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">FECHA CIERRE</label>
          <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
             id="fechaCierre" />
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">NÚMERO DE FOLIOS</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese el número de folios" id="numeroFojas" />
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">FRECUENCIA DE CONSULTA</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese frecuencia de consulta" id="frecuenciaConsulta" />
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">DESTINO FINAL</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="destino">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">UNIDADES DE CONSERVACIÓN</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="unidadesConservacion">
          </select>
        </div>


        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">N CARPETA FÍSICA</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese número de carpeta física" id="numeroCarpetaFisica" />
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">N DE CAJA</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="caja">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">TIPO DE INVENTARIO</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="tipoInventario">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">NIVEL DE INVENTARIO</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="nivelInventario">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">TIPO DE TRANSFERENCIA</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="tipoTransferencia">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">ZONA</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="zona">
          </select>
        </div>


        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">N DE BANDEJA</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="bandeja">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">N DE ESTANTE</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="estanteria">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">TIPO DE SOPORTE</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="soporte">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">TIPO DE ACCESO A LA INFORMACIÓN</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="tipoAcceso">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">ESTADO DE CONSERVACIÓN</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="estadoDocumento">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">INDICADORES DE DETERIORO</label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white" id="indicadoresDeterioros">
          </select>
        </div>

        <div class="mb-3">
          <label class="text-gray-700 font-semibold block mb-1 text-sm">OBSERVACIONES</label>
          <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
            placeholder="Ingrese serie subserie documental" id="observaciones" />
        </div>


      </form>

    </div>
  </div>

</template>


<script>
import variable from '@/js/administracion_archivo/ReporteriaInventario.js';
import ButtonExcel from "@/components/ButtonExcel.vue";
export default {
  name: "ReporteriaInventario",
  components: {
    ButtonExcel,
  },
  mixins: [variable],
};
</script>
