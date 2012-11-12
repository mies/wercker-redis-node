var express = require('express');
var app = express();
var redisurl = require('redis-url');


app.configure('development', function() {
  app.redis = redisurl.connect(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT || process.env.REDISTOGO_URL);
  app.redis.sadd('decepticons', 'megatron');
  app.redis.sadd('decepticons', 'shockwave');
  app.redis.sadd('decepticons', 'atrotrain');
});

app.get('/', function(request, response) {
  res.send('Hello Cybertron!');
});

app.get('/decepticons.json', function(request, response) {
  app.redis.smembers('decepticons', function(err, value) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(value);
    response.end();
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT)
  console.log("Listening on port " + port);
});

module.exports = app;