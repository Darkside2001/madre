<template>
  <button 
    class="rounded-lg px-1 py-1 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-green-100 duration-300"
    @click="exportToExcel">
    <i class="fa-solid fa-file-excel"></i> EXCEL 
  </button>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: "ButtonExcel",
  props: {
    dataTable: { 
      type: Object,
      required: true
    },
    slice: { 
      type: String,
      required: true
    },
  },
  setup(props) {
    const exportToExcel = () => {
      if (props.dataTable) {
        const visibleData = props.dataTable.rows({ filter: 'applied' }).data().toArray();
        
        if (visibleData && visibleData.length > 0) {
          // Filtrar solo hasta la columna 24
          const filteredData = visibleData.map(row => {
            return Object.fromEntries(Object.entries(row).slice(0, parseInt(props.slice)));
          });

          const worksheet = XLSX.utils.json_to_sheet(filteredData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Proyectos');
          XLSX.writeFile(workbook, 'proyectos.xlsx');
        } else {
          alert("No hay datos filtrados para exportar.");
        }
      } else {
        alert("La tabla no está inicializada.");
      }
    };

    return {
      exportToExcel,
    };
  },
};
</script>
