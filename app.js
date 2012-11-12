var express = require('express');
var app = express();
var redisurl = require('redis-url');


app.configure('development', function() {
  console.log(process.env.WERCKER_REDIS_HOST)
  console.log(process.env.WERCKER_REDIS_POST)
  app.redis = redisurl.connect(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT || process.env.REDISTOGO_URL);
  //app.redis = redisurl.connect();
  app.redis.sadd('decepticons', 'megatron');
  app.redis.sadd('decepticons', 'shockwave');
  app.redis.sadd('decepticons', 'astrotrain');
});

app.get('/', function(request, response) {
  res.send('Hello Cybertron!');
});

app.get('/decepticons.json', function(request, response) {
  app.redis.smembers('decepticons', function(err, value) {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(value)
    response.write(JSON.stringify(value));
    response.end();
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT)
  console.log("Listening on port " + port);
});

module.exports = app;