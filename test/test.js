var request = require('supertest')
  , express = require('express');

var app = require('../app.js')

describe('GET', function(){
      console.log(process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT)
      it('respond with json', function(done){
      request(app)
      .get('/decepticons.json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});