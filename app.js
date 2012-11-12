var express = require('express');
var app = express();
var redisurl = require('redis-url');

/*
app.configure('development', function() {
  var connectionString = process.env.WERCKER_REDIS_HOST +':' + process.env.WERCKER_REDIS_PORT
  app.redis = redisurl.connect(connectionString);
  //app.redis = redisurl.connect();
  app.redis.sadd('decepticons', 'megatron');
  app.redis.sadd('decepticons', 'shockwave');
  app.redis.sadd('decepticons', 'astrotrain');
  console.log('asdsad')
});

app.configure('production', function() {
  app.redis = redisurl.connectprocess.env.REDISTOGO_URL
})
*/

var connectionString = process.env.WERCKER_REDIS_HOST
var redis = redisurl.connect(connectionString);
redis.sadd('decepticons', 'megatron');
redis.sadd('decepticons', 'shockwave');
redis.sadd('decepticons', 'astrotrain');


app.get('/', function(request, response) {
  response.send('Hello Cybertron!');
});

app.get('/decepticons.json', function(request, response) {
  redis.smembers('decepticons', function(err, value) {
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