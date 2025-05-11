<template>
  <input 
    :ref="`input-${'elemento'}`"
    class="form-control" 
    :class="{ 'error-border': !formDataInicial.elemento || formDataInicial.elemento.trim() === '' }"
    v-model="formDataInicial.elemento"
    @blur="handleBlurField('elemento')"
  />
</template>

<script>
import { validarFormulario } from '@/js/validaciones/formularios/funcionesObligatorios.js';
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
  },
  mounted(){
    document.querySelectorAll('input').forEach(input => input.classList.remove('error-border'));
  },
  created() {
    const observables = [this.elemento$];
    validarFormulario(observables, (valido) => {
      this.formularioValido = valido;
    });
  },
  methods: {
    handleBlurField(field) {
      const refName = `input-${field}`;
      const inputElement = this.$refs[refName];
      if (inputElement) {
        if (!this.formDataInicial[field] || this.formDataInicial[field].trim() === '') {
          inputElement.classList.add('error-border');
        } else {
          inputElement.classList.remove('error-border');
        }
      }
    },
  }
};
</script>
