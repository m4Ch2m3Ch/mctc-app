function getSettings() {
  let settings = DataTable.settings[0],
    page = Math.ceil(settings._iDisplayStart / settings._iDisplayLength),
    pages = Math.ceil(settings.fnRecordsDisplay() / settings._iDisplayLength),
    numbers = [],
    screenWidth = window.innerWidth,
    userScreen = { xs: 340, sm: 380, md: 620, lg: 800 },
    addFirstLast = screenWidth <= userScreen.sm ? false : true,
    buttons =
      screenWidth < userScreen.sm
        ? 3
        : screenWidth < userScreen.md
        ? 5
        : screenWidth > userScreen.lg
        ? 9
        : 7,
    half = Math.floor(buttons / 2),
    before = addFirstLast ? 2 : 1,
    after = addFirstLast ? 1 : 0;
  return {
    page,
    pages,
    numbers,
    screenWidth,
    addFirstLast,
    buttons,
    half,
    before,
    after,
    userScreen,
  };
}

_range = function (len, start) {
  var out = [];
  var end;

  if (start === undefined) {
    start = 0;
    end = len;
  } else {
    end = start;
    start = len;
  }

  for (var i = start; i < end; i++) {
    out.push(i);
  }

  return out;
};

DataTable.ext.pager.responsive_custom = function () {
  let {
    page,
    pages,
    numbers,
    screenWidth,
    addFirstLast,
    buttons,
    half,
    before,
    after,
    userScreen,
  } = getSettings();

  if (pages <= buttons) {
    numbers = _range(0, pages);
  } else if (pages === 1) {
    // Single button - current page only
    numbers = [page];
  } else if (pages === 3) {
    // Special logic for just three buttons
    if (page <= 1) {
      numbers = [0, 1, "ellipsis"];
    } else if (page >= pages - 2) {
      numbers = _range(pages - 2, pages);
      numbers.unshift("ellipsis");
    } else {
      numbers = ["ellipsis", page, "ellipsis"];
    }
  } else if (page <= half) {
    numbers = _range(0, buttons - before);
    numbers.push("ellipsis");

    if (addFirstLast) {
      numbers.push(pages - 1);
    }
  } else if (page >= pages - 1 - half) {
    numbers = _range(pages - (buttons - before), pages);
    numbers.unshift("ellipsis");

    if (addFirstLast) {
      numbers.unshift(0);
    }
  } else if (screenWidth <= userScreen.sm) {
    numbers = _range(page - 1, page + 2);
    if (addFirstLast) {
      numbers.push(pages - 1);
      numbers.unshift(0);
    }
  } else {
    numbers = _range(page - half + before, page + half - after);
    numbers.push("ellipsis");
    numbers.unshift("ellipsis");

    if (addFirstLast) {
      numbers.push(pages - 1);
      numbers.unshift(0);
    }
  }

  if (screenWidth <= userScreen.xs) {
    //change so small screen uses drop down?
    return ["previous", numbers, "next"];
  } else {
    return ["first", "previous", numbers, "next", "last"];
  }
};
