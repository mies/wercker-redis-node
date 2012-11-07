var express = require('express');
var app = express();
var redis = require('redis-url').connect();

redis.sadd('decepticons', 'megatron');
redis.sadd('decepticons', 'shockwave');
redis.sadd('decepticons', 'atrotrain');

app.get('/', function(request, response) {
  redis.smembers('decepticons', function(err, value) {
    response.send(value);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port " + port);
})