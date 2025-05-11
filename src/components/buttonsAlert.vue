<template>
  <button :class="buttonClasses">
    <i :class="icon"></i>
    <div class="text-xs">{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: "botonAlert",
  props: {
    icon: {
      type: String,
      required: true
    },
    ancho: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    text2: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonClasses() {
      return [
        'rounded-lg', 'px-2', 'py-2', 'border-2', 'border-red-500',
        'text-red-500', 'hover:bg-red-600', 'hover:text-red-100', 'duration-300','ml-2',
        this.ancho 
      ];
    }
  }
};
</script>
