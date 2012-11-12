var express = require('express');
var app = express();
var redisurl = require('redis-url');


app.configure('development', function() {
  var connectionString = process.env.WERCKER_REDIS_HOST +':' + process.env.WERCKER_REDIS_PORT
  app.redis = redisurl.connect(connectionString | process.env.REDISTOGO_URL);
  //app.redis = redisurl.connect();
  app.redis.sadd('decepticons', 'megatron');
  app.redis.sadd('decepticons', 'shockwave');
  app.redis.sadd('decepticons', 'astrotrain');
  console.log('asdsad')
});

app.get('/', function(request, response) {
  response.send('Hello Cybertron!');
});

app.get('/decepticons.json', function(request, response) {
  app.redis.smembers('decepticons', function(err, value) {
    if (err) {
      console.log(err);
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    console.log(value)
    response.write(JSON.stringify(value));
    response.end();
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Connecting to Redis...");
  console.log(process.env.NODE_ENV);
  console.log(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT);
  console.log("Listening on port " + port);
});

module.exports = app;