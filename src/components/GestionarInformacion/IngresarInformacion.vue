<template>
    <main class="w-full flex flex-col items-center">
        <div class="w-full max-w-4xl shadow-lg px-4 py-4 bg-white rounded-2xl">
            <div class="pb-0 card-header text-start">
                <p class="mb-0 text-lg font-bold text-gray-800 text-center">{{ title }}</p>
            </div>

            <div class="card-body">
                <form id="formulario" ref="formulario" role="form" class="text-start flex flex-wrap">
                    
                    <!-- Nombre -->
                    <div class="w-full sm:w-2/3 pr-2 pl-2">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">{{ label }}</label>
                        <input type="text" v-model="formData.nombre"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                            :placeholder="placeholder" :class="{ 'error-border': errors.nombre }" />
                    </div>

                    <!-- Botón Ingresar -->
                    <div class="w-full sm:w-1/3 pr-2 pl-2">
                        <button id="ingresar"
                            class="mt-4 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm" @click="guardar">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<style>
html,
body {
    height: 100%;
    overflow-y: auto;
}
</style>

<script>
import variable from '@/js/administracionInformacion/CrearDatos.js';
export default {
    name: "IngresarInformacion",
    props: {
        title: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        tabla: {
            type: String,
            required: true
        },
        activo: { 
            type: Boolean, 
            required: true 
        }  
        
    },
    mixins: [variable]
};
</script>
