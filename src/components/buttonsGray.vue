<template>
  <button :class="buttonClasses">
    <i :class="icon"></i>
    <div class="text-xs">{{ text }}</div>
  </button>
</template>

<script>
export default {
  name: "buttonsGray",
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
        'rounded-lg', 'px-2', 'py-2', 'border-2', 'border-gray-600',
        'text-gray-600', 'hover:bg-blue-600', 'hover:text-blue-100', 'duration-300','ml-2',
        this.ancho 
      ];
    }
  }
};
</script>
