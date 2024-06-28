import { Searching } from "./searching.js";

class customTable {
  constructor(tableName, columns) {
    this.tableName = tableName;
    this.columns = columns;
    this.customTable = null;
  }
  /**
   * Function to create a DataTable.
   *
   * @param {string} tableName - The ID of the HTML table element.
   * @param {string} ajaxData - The URL to fetch data from.
   * @param {string} dataSrc - The dataSrc value to access.
   * @param {Array} columnsLayout - An array specifying the layout of the table columns.
   */
  createTable(ajaxData = "") {
    if (ajaxData != "") {
      this.url = ajaxData;
      let cachedData = localStorage.getItem(this.url);
      if (cachedData) {
        this.buildObjectTable(cachedData);
        return this.customTable;
      } else {
        this.buildAjaxTable();
        return this.customTable;
      }
    } else {
      this.buildObjectTable();
    }
  }

  buildAjaxTable() {
    let url = this.url;
    this.customTable = new DataTable(document.getElementById(this.tableName), {
      columns: this.columns,
      ajax: {
        type: "POST",
        url: this.url,
        dataSrc: "",
      },
      initComplete: function () {
        let buildSearch = new Searching(this.api(), url);
        buildSearch.buildFilters("select-filter", "no-search");
      },
    });
  }

  buildObjectTable(data) {
    let url = this.url;
    this.customTable = new DataTable(document.getElementById(this.tableName), {
      columns: this.columns,
      data: JSON.parse(data),
      initComplete: function () {
        let buildSearch = new Searching(this.api());
        buildSearch.buildFilters("select-filter", "no-search");
      },
    });
  }
}

export { customTable };
