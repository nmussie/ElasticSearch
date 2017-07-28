var client = new $.es.Client({
  hosts: 'http://localhost:9200'
});

$(document).ready(function() {
  $("#submitSearch").click(function() {
    var val = $("#search").val();
    if (val) {
      $("#searchResults").empty();
      search(val);
      $("#search").val("");
    }
  });
  $("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#submitSearch").click();
    }
});
});

function search(val) {
  client.ping({
    requestTimeout: 3000000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

  client.search({
    q: val
  }).then(function (body) {
    var hits = body.hits.hits;
    console.log(hits);
    showResult(hits);
  }, function (error) {
    console.trace(error.message);
  });
}


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

// function insertRow(date, title, body, user) {
//   return
//  '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">' +
//     '<div class="d-flex w-100 justify-content-between">' +
//       '<small class="text-muted pull-right">' + date + '</small>' +
//       '<h5 class="mb-1">' + title + '</h5></div>' +
//     '<p class="mb-1">' + body + '</p>' +
//     '<small class="text-muted">' + user + '</small></a>';
// }
