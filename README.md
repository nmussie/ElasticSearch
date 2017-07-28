# ElasticSearch

## Setting Up Elastic Search
* wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.2.tar.gz
* tar -zxvf elasticsearch-1.7.2.tar.gz
* cd elasticsearch-1.7.2
* bin/elasticsearch

## To Run index.html and submit_page.html
* Navigate to elasticsearch-1.7.2/config/elasticsearch.yml
* Add the following lines to the file:
  * http.jsonp.enable: true
  * http.cors.enabled: true
  * http.cors.allow-origin: "*"
  * http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
  * http.cors.allow-headers: "X-Requested-With, Content-Type, Content-Length, X-User"

## Access Elastic Search on http://localhost:9200

### submit_page.html allows you to enter a new data object

### index.html allows you to search from the data stored in elasticsearch
