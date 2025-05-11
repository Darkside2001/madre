<template>
  <input 
    class="form-control" 
    v-model="formDataInicial.elemento"
  />
</template>

<script>
export default {
  name: "ImputBuscar",
  data() {
    return {
      formDataInicial: {
        elemento: ''      
      },
    };
  },
};
</script>
