export const languageOptions = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": '<i class="fa-solid fa-magnifying-glass"></i>',
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "No existen datos",
    "oPaginate": {
      "sFirst": " ",
      "sLast": " ",
      "sNext": " ",
      "sPrevious": " "
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };

  export const options = {
    paging: true,
    searching: true,
    dom: 'lrtip',
    paginate: true,
    pageLength: 10,
    sScrollY: '420px',
  };

  export const options__2 = {
    paging: true,
    searching: true,
    dom: 'lrtip',
    paginate: true,
    pageLength: 10,
    sScrollY: '200px',
  };

  export const options__3 = {
    paging: true,
    searching: true,
    dom: 'lrtip',
    paginate: true,
    pageLength: 10,
    sScrollY: '500px',
  };

  export const options__4 = {
    paging: false,
    searching: true,
    dom: 'lrtip',
    paginate: true,
    pageLength: 10,
  };

  const buscarPorColumnaDatatablets = (tabla,columna,termino) => {
    tabla.column(columna) 
    .search(termino, true, false) 
    .draw();
  };
  
  export { buscarPorColumnaDatatablets };