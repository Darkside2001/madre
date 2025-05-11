<template>
  <div class="searchable-select">
    <input
      type="text"
      v-model="search"
      @input="filterOptions"
      placeholder="Buscar..."
    />
    <select v-model="selectedOption">
      <option
        v-for="option in filteredOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchableSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      search: '',
      selectedOption: this.value,
      filteredOptions: []
    };
  },
  computed: {
    // Compute filtered options based on search term
    computedFilteredOptions() {
      const searchLower = this.search.toLowerCase();
      return this.options.filter(option =>
        option.label.toLowerCase().includes(searchLower)
      );
    }
  },
  watch: {
    // Update filtered options when options change
    options(newOptions) {
      this.filteredOptions = this.computedFilteredOptions;
    },
    // Reset selectedOption when value prop changes
    value(newValue) {
      this.selectedOption = newValue;
    },
    // Update filtered options when search term changes
    search(newSearch) {
      this.filteredOptions = this.computedFilteredOptions;
    }
  },
  mounted() {
    // Set initial filtered options
    this.filteredOptions = this.computedFilteredOptions;
  },
  methods: {
    // Update filtered options based on current search term
    filterOptions() {
      this.filteredOptions = this.computedFilteredOptions;
    }
  },
  watch: {
    // Emit input event when selectedOption changes
    selectedOption(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>

<style scoped>
.searchable-select {
  width: 200px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
