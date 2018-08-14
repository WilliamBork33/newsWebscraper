// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "TITLE: " + data[i].title + "<br />" + "LINK: " + data[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // A button to delete a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");
       // A button to display all notes
       $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Show All Notes</button>");


      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});




// When you click the shownote button
// DOESNT'T CURRENTLY WORK
$(document).on("click", "#shownote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});









// When you click the deletenote button
// DOESN'T CURRENTLY WORK
$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});







/*///////////////////////////////

SCRAPE AND CLEAR BUTTON FUNCTIONALITY

//////////////////////////////*/

// Scrape button functionality
$(document).ready(function () {

  function scrapeWait(event) {
    $("#loading").show();
  }

  //when clicking scrape button
  $(document).on("click", "#btn-scrape", scrapeWait);
  //when clicking scrape button
  $(document).on("click", "#btn-scrape", scrapeButton);
  
  //Function to run the route to the scrapper
  function scrapeButton(event) {

    // Ajax call to scrape webpage
    $.ajax({
      method: "GET",
      url: "/scrape",
    })

    // Wait for AJAX call then hide wait symbol
   /*  .then(function() {
      $("#loading").hide();
    }) */

    // Wait for ajax call then refresh page to display results
    .then(function() {
      location.reload();
    })
  }
});

// Clear button functionality
$(document).ready(function () {
  
  //when clicking scrape button
  $(document).on("click", "#btn-clear", clearButton);

  //Function to run the route to the delete
  function clearButton(event) {

    $.ajax({
      method: "GET",
      url: "/clearall",
    })
    // Wait for ajax call then refresh page to display results
    .then(function(reloadPage) {
      window.location.reload();
    })
  }
});