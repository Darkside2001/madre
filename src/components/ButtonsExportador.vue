<template>
  <div>
    <button @click="exportToExcel">Exportar a Excel</button>
    <button @click="exportToPDF">Exportar a PDF</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    tableRef: {
      type: String,
      required: true,
    },
  },
  methods: {
    exportToExcel() {
      const worksheet = XLSX.utils.json_to_sheet(this.data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Proyectos');
      XLSX.writeFile(workbook, 'proyectos.xlsx');
    },
    exportToPDF() {
      const pdf = new jsPDF();
      const dataTable = this.$refs[this.tableRef];

      if (!dataTable) {
        console.error('Elemento de la tabla no encontrado.');
        return;
      }

      html2canvas(dataTable).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('proyectos.pdf');
      }).catch(error => {
        console.error('Error al generar el PDF:', error);
      });
    },
  },
};
</script>

