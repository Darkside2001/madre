<template>
  <div class="form-check">
    <input
      :id="id"
      class="form-check-input"
      type="checkbox"
      :name="name"
      :checked="value"
      @change="handleChange"
    />
    <label :for="id" class="custom-control-label">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "VsudCheckbox",
  props: {
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange(event) {
      this.$emit("input", event.target.checked);
    },
    isChecked() {
      return this.value;
    }
  }
};
</script>
