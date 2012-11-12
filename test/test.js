var request = require('supertest')
  , express = require('express');
  , redisurl = require('redis-url');

var app = require('../app.js')
var connectionString = process.env.WERCKER_REDIS_HOST
app.redis = redisurl.connect(connectionString);

describe('Home', function(){
  console.log('print nodeenv')
  console.log(process.env.NODE_ENV)
      it('respond with hello cybertron', function(done){
      request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('Decepticons', function(){
      it('respond with json', function(done){
      request(app)
      .get('/decepticons.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});