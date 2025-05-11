<template>
    <main class="w-full flex flex-col items-center">
        <table :ref="'dataTable__' + tabla" class="display w-full"></table>
    </main>

    <div class="hidden contenedor__modal_informacion">
        <div class="flex flex-col w-full text-bold text-center items-center">

            <div class="pb-0 card-header text-start">
                <p class="mb-0 text-lg font-bold text-gray-800 text-center" id="tituloEditar"></p>
            </div>

            <form id="formulario" ref="formulario" role="form" class="w-full text-start">

                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Nombre</label>
                    <input type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        placeholder="Ingrese nombre" id="nombreEditar"
                    />
                </div>


                <button id="ingresarInformacionEditar"
                    class="mt-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                >
                    Guardar
                </button>
            
            </form>

        </div>
    </div>

</template>

<style>
html,
body {
    height: 100%;
    overflow-y: auto;
}
</style>

<script>
import variable from '@/js/administracionInformacion/VisualizarDatos.js';
export default {
    name: "VisualizarInformacion",
    props: {
        tabla: {
            type: String,
            required: true,
        },
    },
    mixins: [variable]
};
</script>
