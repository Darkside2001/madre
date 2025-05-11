<template>
  <button 
    class="rounded-lg px-1 py-1 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-red-100 duration-300 ml-2"
    @click="exportToPDF">
    Exportar a PDF
  </button>
</template>

<script>
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
 name: "ButtonPdf",
  props: {
    tableRef: {
      type: String,
      required: true
    }
  },
  methods: {
    exportToPDF() {
      const pdf = new jsPDF();
      const dataTable = this.$refs[this.tableRef];

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
      });
    }
  }
};
</script>
