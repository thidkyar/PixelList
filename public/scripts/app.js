//GET user input and display in respective category
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users/items"
  }).done(items => {
    var counter = 0;
    for (x of items) {
      // counter = counter + 1;
      var categoryDivId = "#cat" + x.category_id;
      // var checkbox = '<input type="checkbox" name="status">'
      // var placeHolderDiv = "<div class='aligned' id='${counter}'></div>";
      // $(placeHolderDiv).prepend(categoryDivId);

      // $("<article>").text(x.name).prepend(placeHolderDiv);
      // $('<input type="checkbox" name="status">').prepend(placeHolderDiv);

      $(categoryDivId).append(`<div class='aligned'> <input type="checkbox" name="status" id="check">` + '<article>' + x.name + '</article>' + `</div>`);
    }
  });
});

$(document).ready(function() {
  //when user clicks an item in product category
  $(".category4").on("click", "article", function(event) {
    let word = $(this)
      .html()
      .split(" ")
      .pop();
    console.log("meeh", word);
    $.ajax({
      url: `http://api.walmartlabs.com/v1/search?query=${word}&format=json&apiKey=4jyjra3wfb9ej2pta6tcjryp`,
      method: "GET",
      success: data => {
        let allItems = data.items.slice(0, 5);
        const $container = $("<div>")
          .addClass("api_container")
          .slideDown("slow");
        allItems.forEach(function(x) {
          $("<img>")
            .attr("src", x.thumbnailImage)
            .appendTo($container);
          $("<h4>")
            .text(`Name: ${x.name}`)
            .appendTo($container);
          $("<p>")
            .text(`Price ${x.salePrice} CAD`)
            .appendTo($container);
          $("<p>")
            .text(`Rating: ${x.customerRating}`)
            .appendTo($container);
        });
        $(this).append($container);
      }
    });
  });

  //when user clicks an item in places category
  $(".category3").on("click", "article", function(event) {
    let word = $(this)
      .html()
      .split(" ")
      .pop();
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.70011,-79.4163&radius=1500&keyword=${word}&key=AIzaSyC_seHud7HqpXweKBTcwP9WSFR3BYTY6-c`,
      method: "GET",
      success: data => {
        let allItems = data.results.slice(0, 5);
        const $container = $("<div>")
          .addClass("api_container")
          .slideDown("slow");
        allItems.forEach(function(x) {
          $("<p>")
            .text(x.photos[0].html_attributions[0])
            .appendTo($container);
          $("<h4>")
            .text(`Name: ${x.name}`)
            .appendTo($container);
          $("<p>")
            .text(`Rating: ${x.rating}`)
            .appendTo($container);
        });
        $(this).append($container);
      }
    });
  });
});
