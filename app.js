var express = require('express');
var app = express();
var redisurl = require('redis-url');


app.configure('development', function() {
  var redis = redisurl.connect(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT || process.env.REDISTOGO_URL);
  redis.sadd('decepticons', 'megatron');
  redis.sadd('decepticons', 'shockwave');
  redis.sadd('decepticons', 'atrotrain');
});

app.get('/', function(request, response) {
  redis.smembers('decepticons', function(err, value) {
    response.send(value);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT)
  console.log("Listening on port " + port);
});

module.exports = app;