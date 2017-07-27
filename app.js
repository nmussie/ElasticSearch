var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

$(document).ready(function(){
  client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });

  $("#submitSearch").click(function() {
    client.search({
      q: $("#search").val();
    }).then(function (body) {
      var hits = body.hits.hits;
    }, function (error) {
      console.trace(error.message);
    });
  });
});
