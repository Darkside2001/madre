<template>
  <input 
    :ref="`input-${'elemento'}`"
    class="form-control" 
    :class="{ 'error-border': !formDataInicial.elemento || formDataInicial.elemento.trim() === '' }"
    v-model="formDataInicial.elemento"
  />
</template>

<script>
import { BehaviorSubject } from 'rxjs';

export default {
  name: "VsudInput",
  data() {
    return {
      formDataInicial: {
        elemento: ''      
      },
      elemento$: new BehaviorSubject(false),
      formularioValido: false,
    };
  }
};
</script>
