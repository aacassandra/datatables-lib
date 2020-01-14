export default {
  initialize(
    id = '',
    options = {
      responsive: false,
      select: false,
      paging: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: true,
      dom: '',
      lengthMenu: [
        [5, 10, 25, 50, -1],
        ['5 rows', '10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5', 'pageLength'],
      lengthChange: false
    },
    footer = false
  ) {
    let table = $('#' + id).DataTable(options);
    if (!options.dom) {
      table
        .buttons()
        .container()
        .appendTo('#' + id + '_wrapper .col-md-6:eq(0)');
    }

    if (footer) {
      $('#' + id + ' tfoot th').each(function() {
        var title = $(this).text();
        if (title != 'Action') {
          $(this).html('<input type="text" placeholder="Search ' + title + '" />');
        }
      });

      table.columns().every(function() {
        var that = this;

        $('input', this.footer()).on('keyup change', function() {
          if (that.search() !== this.value) {
            that.search(this.value).draw();
          }
        });
      });
    }
    return table;
  },
  destroy(id = '') {
    return new Promise(resolve => {
      $('#' + id)
        .DataTable()
        .destroy();
      resolve(null);
    });
  }
};
