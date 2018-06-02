$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users/items"
  }).done(items => {
    for (x of items) {
      let id = x.name
      const categoryDivId = "#cat" + x.category_id;
      const $itemArticle = $("<article>")
        .text(x.name)
        .prependTo(categoryDivId);
      $("<button>")
        .attr('id', id)
        .addClass("btn btn-primary")
        .attr('data-toggle', 'modal')
        .attr('data-target', '#myModalCenter')
        .appendTo($itemArticle)
        

  //     var deleteButton = $("<i>")
  // .addClass("fa fa-trash-o")
  // .attr("data-toggle", "tooltip")
  // .attr("data-placement", "top")
  // .attr("title", "Delete")
  // .appendTo($itemArticle);
    }
  });
});

// $(document).ready(function() {
//   $(".categories").on("click", ".fa-trash-o", function(event) {
//     $.ajax({
//       method: "POST",
//       url: "/api/users/item/delete",
//       data: {
        
//       }
//     });
//   });
// });

$(document).ready(function() {
  $('.modal').on('hidden.bs.modal', function(e)
    { 
        $('.api_container').remove();
    }) ;
  //when user clicks an item in product category
  $("#cat4").on("click", "button", function(event) {
    console.log(this.id)
    let word = this.id
      .split(" ")
      .pop();
    console.log("walmart API called: ", word);
    $.ajax({
      url: `http://api.walmartlabs.com/v1/search?query=${word}&format=json&apiKey=4jyjra3wfb9ej2pta6tcjryp`,
      method: "GET",
      success: data => {
        let allItems = data.items.slice(0, 5);
        //MODAL CONTAINER
        // const $div1 = $("<div>")
        //   .attr('id', 'myModalCenter')
        //   .addClass("modal hide fade")
        //   .attr('tabindex', '-1')
        //   .attr('role', 'dialog')
        //   .attr('aria-labelledby', 'myModalCenterLabel')
        //   .attr('aria-hidden', 'true')
        // const $div2 = $("<div>")
        //   .addClass("modal-dialog modal-dialog-centered")
        //   .attr("role", "document")
        //   .appendTo($div1)
        // const $div3 = $("<div>").addClass("modal-content").appendTo($div2)
        // const $div4 = $("<div>").addClass("modal-header").appendTo($div3)
        // $("<h5>").addClass("modal-title").attr('id', 'myModalLongTitle').text("Nearby").appendTo($div4)
        // $("<button>").attr("type","button").addClass("close").attr("data-dismiss","modal").attr("aria-label","close").appendTo($div4)
        const $container = $("<div>").addClass("api_container")
        //LOOP THROUGH API JSON
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
        $(".modal-body").append($container);
      }
    });
  });

  //when user clicks an item in places category
  $("#cat3").on("click", "button", function(event) {
    let word = this.id
      .split(" ")
      .pop();
      console.log("places called: ", word);
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.70011,-79.4163&radius=1500&keyword=${word}&key=AIzaSyDqhirGwlX7eAtdhaXNHN_5N8Ig8STev9o`,
      method: "GET",
      success: data => {
        let allItems = data.results.slice(0, 5);
        const $container = $("<div>")
          .addClass("api_container")
        allItems.forEach(function(x) {
          $("<div>")
            .html(x.photos[0].html_attributions[0])
            .appendTo($container);
          $("<h4>")
            .text(`Name: ${x.name}`)
            .appendTo($container);
          $("<p>")
            .text(`Rating: ${x.rating}`)
            .appendTo($container);
        });
        $(".modal-body").append($container);
      }
    });
  });

  //when user click an item in books category
  $("#cat1").on("click", "button", function(event){
    let keyword = this.id.split(' ').pop();
    console.log(this.id)
    $.ajax({
      url: `https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=AIzaSyDBPNnieDsw1ncCHNz1_lQrzfvnqYINbdQ`,
      method: "GET",
      success: (data) => {
        const $container = $("<div>")
          .addClass("api_container")
        data.items.forEach((el) => {
          let sourceImage = el.volumeInfo.imageLinks.smallThumbnail;
          let sourceTitle = el.volumeInfo.title;
          let sourceAuthor = el.volumeInfo.authors;
          let sourceRating = el.volumeInfo.averageRating;
          let sourceCountry = el.saleInfo.country;
          $("<img>").attr('src', sourceImage).appendTo($container);
          $("<p>").text(sourceTitle).appendTo($container);
          $("<p>").text(sourceAuthor).appendTo($container);
          $("<p>").text(sourceRating).appendTo($container);
          $("<p>").text(sourceCountry).appendTo($container);
        });
        $(".modal-body").append($container);
      }
    });
  });
});
