var redis = require('redis')
  , should = require('should');


describe("Decepticons", function() {
  it("", function(done) {
    console.log(process.env.WERCKER_REDIS_HOST);
    console.log(process.env.WERCKER_REDIS_PORT);
    console.log(typeof(process.env.WERCKER_REDIS_HOST));
    console.log(typeof(process.env.WERCKER_REDIS_PORT));
    var connectionString = process.env.WERCKER_REDIS_HOST + ':' + process.env.WERCKER_REDIS_PORT;
    var host = process.env.WERCKER_REDIS_HOST;

    //var redis = redisurl.connect(connectionString);
    var client = redis.createClient(process.env.WERCKER_REDIS_HOST, process.env.WERCKER_REDIS_PORT);
    client.sadd('decepticons', 'megatron');
    client.sadd('decepticons', 'shockwave');
    client.sadd('decepticons', 'astrotrain');

    client.smembers('decepticons', function(err, value) {
    if (err) {
      console.log(err);
    }
    value.should.eql(['astrotrain', 'shockwave','megatron']);
    done();
    });
  });
});