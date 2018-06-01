$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users/items"
  }).done((items) => {
    for(x of items) {
      var categoryDivId = "#cat" + x.category_id;
      $("<article contenteditable='true'>").text(x.name).appendTo(categoryDivId);
    }
  });
});
