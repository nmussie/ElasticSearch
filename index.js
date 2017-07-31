//Where the elastic search client is running
var client = new $.es.Client({
  hosts: 'http://localhost:9200'
});

$(document).ready(function() {

  //Event listener for the search button
  $("#submitSearch").click(function() {
    var val = $("#search").val();
    if (val) {
      $("#searchResults").empty();
      search(val);
      $("#search").val("");
    }
  });

  //Event listener for the form submission on the submit page
  $("#submitValues").click(function() {
    var title = $("#title").val();
    var body = $("#body").val();
    var index = $("#index").val();
    var type = $("#type").val();
    var id = $("#id").val();
    addVal(title, body, index, type, id);
  });

  //Event listener for the enter button when a search is being made
  $("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#submitSearch").click();
    }
  });

  //Event listener for when a suggestion is clicked
  $("#suggestText").click(function() {
    var val = $("#suggestText").text();
    search(val);
    $("#suggestTemplate").hide();
  });
});

//Makes connection to the elastic search cluster
function search(val) {
  client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

  //API call for the elastic search function
  client.search({
    q: val
  }).then(function (body) {
    var hits = body.hits.hits;
    //console.log(hits);
    showResult(hits);
    $("#results").show();
    if (hits.length > 0) {
      $("#results").text("Showing " + hits.length + " results for " + val);
    }
    else {
      $("#results").text("No results for " + val);
    }
  }, function (error) {
    console.trace(error.message);
  });

//API call for the elastic search suggest function
client.suggest({
  index: "",
  body: {
    titleSuggester: {
      text: val,
      term: {
        field: "title"
      }
    },
    userSuggester: {
      text: val,
      term: {
        field: "user"
      }
    },
    bodySuggester: {
      text: val,
      term: {
        field: "body"
      }
    }
  }
},
function(error, response) {
  console.log(response);
  var titleSearch = response["titleSuggester"][0].options;
  var bodySearch = response["bodySuggester"][0].options;
  var userSearch = response["userSuggester"][0].options;
  displaySuggest(titleSearch, bodySearch, userSearch);
});
}

//Adds the entry from the submit page to the elasticsearch
function addVal(title, body, index, type, id) {
  $.ajax({
        type: "PUT",
        async: false,
        url: 'http://localhost:9200/' + index + '/' + type + '/'+ id,
        data: JSON.stringify({"user" : "testuser","postDate" : "2012-06-21","body" : body, "title": title}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (msg)
          {
            alert("Thanks for your submission!");
            $('#stage').html(msg._index );
            $('#stage').append(" type : "+msg._type );
            $('#stage').append(" id :"+msg._id)
          },
        error: function (err)
        { alert(err.responseText)}
    });
}

//After you grab the results, this method actually shows them all in order of relevancy
function showResult(result) {
  for (i = 0; i < result.length; i++) {
    var body = result[i]._source["body"];
    var date = result[i]._source["postDate"];
    var title = result[i]._source["title"];
    var user = result[i]._source["user"];
    if (body && date && title && user) {
      $("#searchResults").append('<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
         '<div class="d-flex w-100 justify-content-between">' +
           '<small class="text-muted pull-right">' + date + '</small>' +
           '<h5 class="mb-1">' + title + '</h5></div>' +
         '<p class="mb-1">' + body + '</p>' +
         '<small class="text-muted">' + user + '</small></a>');
         $("#searchResults").show();
    }
  }
}

//Checks to see if there is a suggestion for Title, Body, or User (in that respective order)
function displaySuggest(titleSearch, bodySearch, userSearch) {
  if (titleSearch.length != 0) {
    $("#suggestTemplate").show();
    $("#suggestText").text(titleSearch[0].text);
  }
  else if (bodySearch.length != 0) {
    $("#suggestTemplate").show();
    $("#suggestText").text(bodySearch[0].text);
  }
  else if (userSearch.length != 0) {
    $("#suggestTemplate").show();
    $("#suggestText").text(userSearch[0].text);
  }
}
