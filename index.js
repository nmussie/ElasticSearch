// var elasticsearch = require('elasticsearch');

$(document).ready(function() {
  $("#submitSearch").click(function() {
    var val = $("#search").val();
    console.log(search(val));
  });
});

function search(val) {
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  client.ping({
    requestTimeout: 30000,
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
  }, function (error) {
    console.trace(error.message);
  });
}
