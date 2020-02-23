'use strict';

const redis = require('../utils/redis-utils');

module.exports = function(City) {
  City.observe('before save', function filterProperties(ctx, next) {
    console.log('Before save event called - ctx = ', ctx.instance);
    next();
  });

  City.observe('after save', function filterProperties(ctx, next) {
    console.log('After save event called - ctx = ', ctx.instance);
    const redisCli = redis.getClientStore();
    redisCli.hmset('Meetings', [ctx.instance.id.toString(), JSON.stringify(ctx.instance)], function(err, res) {
      if (!err) {
        console.log('inserted in redis ', res);
        next();
      } else {
        console.log('error during redis insertion ', err);
        next();
      }
    });
  });

  City.observe('access', function filterProperties(ctx, next) {
    const redisCli = redis.getClientStore();
    console.log('in access - ctx.query - ', ctx.query);
    console.log('in access - ctx.where - ', ctx.query.where);
    console.log('in access - ctx.where - ', ctx.query.where.id);
    let ID = ctx.query.where.id;
    console.log("ID - ", ID);
    redisCli.hget('Meetings', ID.toString(), (err, result) => {
      if (!err) {
        console.log('data found in redis ', result);
        next();
      } else {
        console.log('Error during finding data  ', err);
        next();
      }
    });
  });
};
