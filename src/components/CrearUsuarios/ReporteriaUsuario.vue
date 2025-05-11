<template>
    <main class="w-full flex flex-col items-center">
        <div class="w-full overflow-x-auto md:overflow-visible">
            <table ref="dataTable__recibidos" class="display w-full"></table>
        </div>
    </main>

    <div class="hidden contenedor__modal">
        <div class="flex flex-col w-full text-bold text-center items-center">

            <form id="formulario" ref="formulario" role="form" class="w-full text-start">
                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Cédula</label>
                    <input type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        placeholder="Ingrese cédula" id="cedulaEditar"
                         />
                </div>

                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Nombre</label>
                    <input type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm uppercase"
                        placeholder="Ingrese nombre completo" id="nombreEditar"
                    />
                </div>

                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Correo</label>
                    <input type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        placeholder="Ingrese correo" 
                        id="correoEditar" />
                </div>

                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Celular</label>
                    <input type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                        placeholder="Ingrese celular" id="celularEditar"
                       />
                </div>

                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Dirección</label>
                    <input type="text" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm uppercase"
                        placeholder="Ingrese dirección" 
                        id="direccionEditar" />
                </div>

                <div class="mb-3">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Rol</label>
                    <select
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
                        id="rolEditar">
                        <option value="" disabled>--Seleccione un rol--</option>
                        <option v-for="rol in rolesDisponibles" :key="rol.idRol" :value="rol">
                            {{ rol.nombre }}
                        </option>
                    </select>
                </div>

                <div class="flex flex-wrap gap-2" id="contenedorGeneral__seleccionable"></div>
                <div id="rolesSeleccionados"></div>

                <div class="mt-2">
                    <label class="text-gray-700 font-semibold block mb-1 text-sm">Estado</label>
                    <select 
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
                        id="estadoEditar">
                        <option value="">--Seleccione un estado--</option>
                        <option value="A">Activo</option>
                        <option value="I">Inactivo</option>
                    </select>
                </div>

                <button id="ingresarInformacion"
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
import variable from '@/js/administracion/ReporteriaUsuario.js';
export default {
    name: "ReporteriaUsuario",
    mixins: [variable],
};
</script>
