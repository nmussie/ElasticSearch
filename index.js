//var elasticsearch = require('elasticsearch');
//const $ = require('jquery');

$(document).ready(function() {
  $("#submitSearch").click(function() {
    var val = $("#search").val();
    console.log(val);
    console.log(search(val));
  });
});

// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });

var client = new $.es.Client({
  hosts: 'http://localhost:9200'
});


function search(val) {
  // var client = new $.es.Client({
  //   host: 'localhost:9200'
  // });

  // var client = new elasticsearch.Client({
  //   host: 'localhost:9200',
  //   log: 'trace'
  // });

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
  }, function (error) {
    console.trace(error.message);
  });
}
