# ElasticSearch
* This application is essentially a user interface for one's local elastic search cluster, where one is able to search and index data quite easily. This includes suggestions as well, meaning if data is indexed but searched incorrectly, our application will make a suggestion based on what was searched.

## Setting Up Elastic Search
* All of the commands below are done through a terminal with at least JDK 6 installed 
  ```
  wget https://download.elastic.co/elasticsearch/elasticsearch/elasticsearch-1.7.2.tar.gz
  ```
  ```
  tar -zxvf elasticsearch-1.7.2.tar.gz
  ```
  ```
  cd elasticsearch-1.7.2
  ```
  ```
  bin/elasticsearch
  ```
* After those chains of commands you should see something like this in the terminal:
```
[2015-09-14 15:32:52,278][INFO ][node                     ] [Big Man] version[1.7.2], pid[10907], build[e43676b/2015-09-14T09:49:53Z]
[2015-09-14 15:32:52,279][INFO ][node                     ] [Big Man] initializing ...
[2015-09-14 15:32:52,376][INFO ][plugins                  ] [Big Man] loaded [], sites []
[2015-09-14 15:32:52,426][INFO ][env                      ] [Big Man] using [1] data paths, mounts [[/ (/dev/sdc1)]], net usable_space [8.7gb], net total_space [219.9gb], types [ext3]
Java HotSpot(TM) Server VM warning: You have loaded library /tmp/es/elasticsearch-1.7.2/lib/sigar/libsigar-x86-linux.so which might have disabled stack guard. The VM will try to fix the stack guard now.
It's highly recommended that you fix the library with 'execstack -c <libfile>', or link it with '-z noexecstack'.
[2015-09-14 15:32:55,294][INFO ][node                     ] [Big Man] initialized
[2015-09-14 15:32:55,294][INFO ][node                     ] [Big Man] starting ...
[2015-09-14 15:32:55,411][INFO ][transport                ] [Big Man] bound_address {inet[/0:0:0:0:0:0:0:0:9300]}, publish_address {inet[/192.168.43.172:9300]}
[2015-09-14 15:32:55,428][INFO ][discovery                ] [Big Man] elasticsearch/VKL1HQmyT_KRtmTGznmQyg
[2015-09-14 15:32:59,210][INFO ][cluster.service          ] [Big Man] new_master [Big Man][VKL1HQmyT_KRtmTGznmQyg][Happy][inet[/192.168.43.172:9300]], reason: zen-disco-join (elected_as_master)
[2015-09-14 15:32:59,239][INFO ][http                     ] [Big Man] bound_address {inet[/0:0:0:0:0:0:0:0:9200]}, publish_address {inet[/192.168.43.172:9200]}
[2015-09-14 15:32:59,239][INFO ][node                     ] [Big Man] started
[2015-09-14 15:32:59,284][INFO ][gateway                  ] [Big Man] recovered [0] indices into cluster_state[2015-09-14 15:32:52,278][INFO ][node                     ] [Big Man] version[1.7.2], pid[10907], build[e43676b/2015-09-14T09:49:53Z]
[2015-09-14 15:32:52,279][INFO ][node                     ] [Big Man] initializing ...
[2015-09-14 15:32:52,376][INFO ][plugins                  ] [Big Man] loaded [], sites []
[2015-09-14 15:32:52,426][INFO ][env                      ] [Big Man] using [1] data paths, mounts [[/ (/dev/sdc1)]], net usable_space [8.7gb], net total_space [219.9gb], types [ext3]
Java HotSpot(TM) Server VM warning: You have loaded library /tmp/es/elasticsearch-1.7.2/lib/sigar/libsigar-x86-linux.so which might have disabled stack guard. The VM will try to fix the stack guard now.
It's highly recommended that you fix the library with 'execstack -c <libfile>', or link it with '-z noexecstack'.
[2015-09-14 15:32:55,294][INFO ][node                     ] [Big Man] initialized
[2015-09-14 15:32:55,294][INFO ][node                     ] [Big Man] starting ...
[2015-09-14 15:32:55,411][INFO ][transport                ] [Big Man] bound_address {inet[/0:0:0:0:0:0:0:0:9300]}, publish_address {inet[/192.168.43.172:9300]}
[2015-09-14 15:32:55,428][INFO ][discovery                ] [Big Man] elasticsearch/VKL1HQmyT_KRtmTGznmQyg
[2015-09-14 15:32:59,210][INFO ][cluster.service          ] [Big Man] new_master [Big Man][VKL1HQmyT_KRtmTGznmQyg][Happy][inet[/192.168.43.172:9300]], reason: zen-disco-join (elected_as_master)
[2015-09-14 15:32:59,239][INFO ][http                     ] [Big Man] bound_address {inet[/0:0:0:0:0:0:0:0:9200]}, publish_address {inet[/192.168.43.172:9200]}
[2015-09-14 15:32:59,239][INFO ][node                     ] [Big Man] started
[2015-09-14 15:32:59,284][INFO ][gateway                  ] [Big Man] recovered [0] indices into cluster_state
```
* You can now access your elastic search cluster through http://localhost:9200 on your web browser; this will return something like:
  ```
  {
    "status" : 200,
    "name" : "Big Man",
    "cluster_name" : "elasticsearch",
    "version" : {
      "number" : "1.7.2",
      "build_hash" : "e43676b1385b8125d647f593f7202acbd816e8ec",
      "build_timestamp" : "2015-09-14T09:49:53Z",
      "build_snapshot" : false,
      "lucene_version" : "4.10.4"
    },
    "tagline" : "You Know, for Search"
  }
  ```

## To Run index.html and submit_page.html
* Navigate to elasticsearch-1.7.2/config/elasticsearch.yml
* Add the following lines to the file:
  ```javascript
  * http.jsonp.enable: true
  * http.cors.enabled: true
  * http.cors.allow-origin: "*"
  * http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
  * http.cors.allow-headers: "X-Requested-With, Content-Type, Content-Length, X-User"
  ```
  
## Indexing Data
* You can index or insert data into your local elastic search cluster through the submit_page.html page or manually through the terminal. If you prefer the ladder, then you can do so by typing in the terminal:
  ```
  curl -XPUT 'http://localhost:9200/blog/post/1' -d '{"user": "Enter user", "postDate": "Enter date", "body": "Enter body" , "title": "Enter title"}'
  ```
* If successful, it the terminal should return:
  ```
  {"ok":true,"_index":"blog","_type":"post","_id":"1","_version":1}
  ```
* Our submit page essentially does this for you but gives you a user interface to do so.
  
## Searching Data
* You can search data that you have indexed through the index.html page or manually through the terminal. If you prefer the ladder, then you can do so by typing in the terminal:
  ```
  curl 'http://localhost:9200/blog/post/_search?q=user:gary&pretty=true'
  ```
* This searches all blog posts by gary (just an example), but searching through our index.html is more powerful in the fact that it shows you what you have requested as well as suggestions based on what you have searched.
