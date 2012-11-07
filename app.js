var express = require('express');
var redis = require('redis-url').connect();

app.get('/', function(request, response) {
  response.send('hi')
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on port " + port);
})