<template>
    <main class="w-full flex flex-col items-center">
        <div class="w-full sm:w-2/5 max-w-4xl shadow-lg px-4 py-4 bg-white rounded-2xl">
            <div class="pb-0 card-header text-start">
                <p class="mb-0 text-lg font-bold text-gray-800 text-center">REGISTRO DE USUARIOS</p>
            </div>

            <div class="card-body">
                <form id="formulario" ref="formulario" role="form" class="text-start">
                    <!-- Cédula -->
                    <div class="mb-3">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">Cédula</label>
                        <input type="text" v-model="formData.cedula"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                            placeholder="Ingrese cédula" id="cedula" :class="{ 'error-border': errors.cedula }"
                            @input="inputCedula" />
                    </div>

                    <!-- Nombre -->
                    <div class="mb-3">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">Nombre</label>
                        <input type="text" v-model="formData.nombre"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm uppercase"
                            placeholder="Ingrese nombre completo" :class="{ 'error-border': errors.nombre }"
                            @input="limpiarTexto"
                        />
                    </div>

                    <!-- Correo -->
                    <div class="mb-3">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">Correo</label>
                        <input type="text" v-model="formData.correo"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                            placeholder="Ingrese correo" :class="{ 'error-border': errors.correo }" />
                    </div>

                    <!-- Celular -->
                    <div class="mb-3">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">Celular</label>
                        <input type="text" v-model="formData.celular"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                            placeholder="Ingrese celular" id="celular" :class="{ 'error-border': errors.celular }"
                            @input="inputCelular" />
                    </div>

                    <!-- Dirección -->
                    <div class="mb-3">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">Dirección</label>
                        <input type="text" v-model="formData.direccion"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm uppercase"
                            placeholder="Ingrese dirección" :class="{ 'error-border': errors.direccion }" />
                    </div>

                    <!-- Select de Roles -->
                    <div class="mb-3">
                        <label class="text-gray-700 font-semibold block mb-1 text-sm">Rol</label>
                        <select v-model="selectedRole"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm bg-white"
                            @change="agregarRol">
                            <option value="" disabled>--Seleccione un rol--</option>
                            <option v-for="rol in rolesDisponibles" :key="rol.idRol" :value="rol">
                                {{ rol.nombre }}
                            </option>
                        </select>
                    </div>


                    <!-- Lista de Roles Seleccionados -->
                    <div class="flex flex-wrap gap-2">
                        <div v-for="(rol, index) in formData.rol" :key="index"
                            class="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                            {{ rol.nombre }}
                            <button type="button" @click="eliminarRol(index)"
                                class="ml-2 text-white hover:text-red-400 bg-white">
                                ✖
                            </button>
                        </div>
                    </div>

                    <!-- Botón Ingresar -->
                    <button id="ingresar"
                        class="mt-3 bg-blue-800 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-md w-full text-sm"
                        @click="guardar">
                        Guardar
                    </button>
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
import variable from '@/js/administracion/CrearUsuario.js';
export default {
    name: "CrearUsuario",
    mixins: [variable],
};
</script>
