$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users/items"
  }).done(items => {
    for (x of items) {
      let id = x.name;
      let itemId = x.id;
      const categoryDivId = "#cat" + x.category_id;
      const $itemArticle = $("<article>")
        .text(x.name)
        .attr("id", itemId)
        .prependTo(categoryDivId);
      $("<button>")
        .attr("id", id)
        .css("margin-left", "174px")
        .addClass("btn btn-primary")
        .attr("value", "see more")
        .attr("data-toggle", "modal")
        .attr("data-target", "#myModalCenter")
        .appendTo($itemArticle);
      const $deleteButton = $("<button>")
        .attr("id", id)
        .addClass("btn")
        .attr("data-target", "#moveToggle")
        .attr("value", "move")
        .appendTo($itemArticle);
        $("<i>")
      .addClass("fas fa-trash-alt")
      .appendTo($deleteButton)
      // let $newForm = $("<form>")
      // .attr("method", "POST")
      // .attr("action", "/api/users/items/delete")
      // .appendTo($itemArticle)
      // $("<input>")
      // .css("display", "inline-block")
      // .css("margin-left", "10px")
      // .attr('type', 'submit')
      // .attr("value", 'delete')
      // .appendTo($newForm)
      // $("<i>")
      // .css("padding-left", "10px")
      // .attr("id", itemId)
      // .addClass("fas fa-trash-alt")
      // .appendTo($itemArticle);

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
  $(".modal").on("hidden.bs.modal", function(e) {
    $(".api_container").remove();
  });
  //when user clicks an item in product category
  $("#cat4").on("click", ".btn-primary", function(event) {
    console.log(this.id);
    let word = this.id.split(" ").pop();
    console.log("walmart API called: ", word);
    $.ajax({
      url: `http://api.walmartlabs.com/v1/search?query=${word}&format=json&apiKey=4jyjra3wfb9ej2pta6tcjryp`,
      method: "GET",
      success: data => {
        let allItems = data.items.slice(0, 5);
        const $container = $("<div>").addClass("api_container");
        //LOOP THROUGH API JSON
        allItems.forEach(function(x) {
          $("<img>")
            .attr("src", x.thumbnailImage)
            .appendTo($container);
          const $itemName = $("<h4>")
            .text(`Name: ${x.name}`)
            .appendTo($container);
          $("<p>")
            .text(`Price ${x.salePrice} CAD`)
            .appendTo($container);
          $("<p>")
            .text(`Rating: ${x.customerRating}`)
            .appendTo($container);
          $("<a>")
            .attr("href", `${x.productUrl}`)
            .addClass("btn")
            .attr("role", "button")
            .text("Buy Now")
            .appendTo($itemName);
        });
        $(".modal-body").append($container);
      }
    });
  });

  //when user clicks an item in places category
  $("#cat3").on("click", ".btn-primary", function(event) {
    let word = this.id.split(" ").pop();
    console.log("places called: ", word);
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.70011,-79.4163&radius=1500&keyword=${word}&key=AIzaSyDqhirGwlX7eAtdhaXNHN_5N8Ig8STev9o`,
      method: "GET",
      success: data => {
        let allItems = data.results.slice(0, 5);
        const $container = $("<div>").addClass("api_container");
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
  $("#cat1").on("click", ".btn-primary", function(event) {
    let keyword = this.id.split(" ").pop();
    console.log(this.id);
    $.ajax({
      url: `https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=AIzaSyDBPNnieDsw1ncCHNz1_lQrzfvnqYINbdQ`,
      method: "GET",
      success: data => {
        const $container = $("<div>").addClass("api_container");
        data.items.forEach(el => {
          let sourceImage = el.volumeInfo.imageLinks.thumbnail;
          let sourceTitle = el.volumeInfo.title;
          let sourceAuthor = el.volumeInfo.authors;
          let sourceRating = el.volumeInfo.averageRating;
          let sourceCountry = el.saleInfo.country;
          $("<img>")
            .attr("src", sourceImage)
            .appendTo($container);
          $("<h4>")
            .text(`Title: ${sourceTitle}`)
            .appendTo($container);
          $("<p>")
            .text(`Author: ${sourceAuthor}`)
            .appendTo($container);
          $("<p>")
            .text(`Rating: ${sourceRating}/10`)
            .appendTo($container);
          $("<p>")
            .text(`Country: ${sourceCountry}`)
            .appendTo($container);
        });
        $(".modal-body").append($container);
      }
    });
  });

  //when user click an item in entertainment category
  $("#cat2").on("click", ".btn-primary", function(event) {
    let keyword = this.id.split(" ").pop();
    console.log(this.id);
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=312c5afd5ea5d9dcde6fc7dbd0b1e334&query=${keyword}`,
      method: "GET",
      success: data => {
        let allItems = data.results.slice(0, 5);
        const $container = $("<div>").addClass("api_container");
        allItems.forEach(x => {
          $("<img>")
            .attr("src", `http://image.tmdb.org/t/p/w185${x.poster_path}`)
            .appendTo($container);
          $("<h4>")
            .text(`Title: ${x.title}`)
            .appendTo($container);
          $("<p>")
            .text(`Rating: ${x.vote_average}/10`)
            .appendTo($container);
          $("<p>")
            .text(`Release Date: ${x.release_date}`)
            .appendTo($container);
        });
        $(".modal-body").append($container);
      }
    });
  });
  $("#cat4").on("click", ".btn", function(e) {
    let newId = this.id;
    $.ajax({
      method: "POST",
      url: "/api/users/items/delete",
      data: { id: newId }
    }).done(e => {
      console.log(e);
    });
  });
  $("#cat3").on("click", ".btn", function(e) {
    let newId = this.id;
    $.ajax({
      method: "POST",
      url: "/api/users/items/delete",
      data: { id: newId }
    }).done(e => {
      console.log(e);
    });
  });
  $("#cat2").on("click", ".btn", function(e) {
    let newId = this.id;
    $.ajax({
      method: "POST",
      url: "/api/users/items/delete",
      data: { id: newId }
    }).done(e => {
      console.log(e);
    });
  });
  $("#cat1").on("click", ".btn", function(e) {
    let newId = this.id;
    $.ajax({
      method: "POST",
      url: "/api/users/items/delete",
      data: { id: newId }
    }).done(e => {
    });
  });
  $("#cat5").on("click", ".btn", function(e) {
    let newId = this.id;
    $.ajax({
      method: "POST",
      url: "/api/users/items/delete",
      data: { id: newId }
    }).done(e => {
    });
  });
});
