class Searching {
  constructor(table, url = "") {
    this.tableApi = table;
    this.url = url;
  }

  /**
   * Creates select element and adds options based on data from the table. Then adds change listener.
   *
   *
   * @param {string} selectClass - Class used to identify columns with select filter.
   */
  buildFilters(selectClass = null, noSearchClass = null) {
    if (this.url !== "") {
      localStorage.setItem(this.url, JSON.stringify(this.tableApi.ajax.json()));
    }

    let checkClear = this.checkClear;
    let tableheader = this.tableApi.table().header();
    let tr = document.createElement("tr");
    let visibleColumns = this.tableApi.columns().visible().toArray();
    let i = 0;
    let tableHasSelect = false;
    this.tableApi.columns().every(function (index) {
      let state = this.state.loaded();
      if (visibleColumns[index] === true) {
        let th = document.createElement("th");
        tr.append(th);
        let currentColumn = tr.children[i];
        let columnClasses = this.header().classList;
        let stateSaveValue = "";
        if (state !== null) {
          stateSaveValue = state.columns[index].search.search;
        }

        if (stateSaveValue != "") {
          checkClear("search");
        }

        if (columnClasses.contains(selectClass)) {
          let select = $(
            '<select data-index="' + index + '" class="form-select"/>'
          );
          let column = this;
          tableHasSelect = true;
          select.append(new Option("", ""));

          column
            .data()
            .sort()
            .unique()
            .each(function (value) {
              let text = value;
              if (value == null) {
                text = "-";
                value = "-";
              } else {
                value = "^" + value + "$";
              }

              if (stateSaveValue == value) {
                select.append(new Option(text, value, true, true));
              } else {
                select.append(new Option(text, value));
              }
            });

          select.appendTo(currentColumn);
        } else if (columnClasses.contains(noSearchClass)) {
          currentColumn.innerHTML = "<th></th>";
        } else {
          let searchInput =
            '<input type="text" class="form-control form-control-sm" placeholder="Search..."  value="' +
            stateSaveValue +
            '" data-index="' +
            index +
            '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';
          currentColumn.innerHTML = searchInput;
        }
        i++;
      }
    });

    tableheader.appendChild(tr);

    if (tableHasSelect === true) {
      this.setPageListeners("table", "select");
    }

    this.setPageListeners("table", "input");
  }

  /**
   * Sets up event listeners based on element type and wrapper. Add more as needed.
   *
   *
   * @param {string} wrapper - element wrapper for the selector.
   * @param {string} type - type of element to add the listener to.
   */
  setPageListeners(wrapper, type) {
    let selector = wrapper + " " + type;
    let elements = document.querySelectorAll(selector);
    let events = [];

    switch (type) {
      case "select":
        events = ["change"];
        break;
      default:
        events = ["keyup", "paste", "cut"];
        break;
    }

    elements.forEach((element) => {
      events.forEach((event) => {
        element.addEventListener(event, () => {
          if (wrapper == "table") {
            this.searchTable(element, this.tableApi);
          }
        });
      });
    });
  }

  /**
   * Searches the datatable based on element value and redraws. Will then check for clear button
   *
   * @param {Object} element - element that filter action was taken on.
   *
   */
  searchTable(element) {
    let strictSearch = false;
    if (element.tagName == "SELECT") {
      strictSearch = true;
    }
    this.tableApi
      .column(element.dataset.index)
      .search(element.value, strictSearch)
      .draw();
    this.checkClear(element.value);
  }

  /**
   * Sets visibility of the clear button. Button must have id of btnClear
   *
   * @param {string} value - value of the filter.
   */

  checkClear(value) {
    let clear = document.getElementById("btnClear");
    if (clear) {
      value == ""
        ? (clear.style.visibility = "hidden")
        : (clear.style.visibility = "visible");
    }
  }
}

export { Searching };
