$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users/items"
  }).done((items) => {
    for(x of items) {
      // console.log('CONSOLE LOG YA', )
      $("<div>").text(x.name).appendTo($("body"));
    }
  });
});
