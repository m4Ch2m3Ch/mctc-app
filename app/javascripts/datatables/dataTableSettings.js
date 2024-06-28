Object.assign(DataTable.defaults, {
  order: [0, "asc"],
  stateSave: true,
  scrollX: true,
  pagingType: "responsive_custom",
  processing: true,
  language: {
    processing: "<i class='fa fa-sync fa-spin'></i>",
  },
  layout: {
    top2Start: {
      buttons: [
        {
          text: '<i class="fa fa-eraser"></i> Clear Saved Search',
          className: "btnClear btn-info",
          attr: {
            id: "btnClear",
          },
          action: function () {
            this.state.clear();
            window.location.reload();
          },
        },
      ],
    },
    top2End: {
      buttons: [
        {
          extend: "excel",
          text: '<i class="fa fa-download"></i> Excel',
          className: "ms-1 btn-info",
        },
        {
          extend: "csv",
          text: '<i class="fa fa-download"></i> CSV',
          className: "ms-1 btn-info",
        },
      ],
    },
    topStart: {
      pageLength: {
        menu: [10, 25, 50, 100],
      },
    },
    topEnd: "paging",
    bottomStart: "info",
    bottomEnd: "paging",
  },
});
