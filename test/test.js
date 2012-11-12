var request = require('supertest')
  , express = require('express');

var app = require('../app.js')

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