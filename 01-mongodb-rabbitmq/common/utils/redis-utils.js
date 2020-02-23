'use strict';

var Promise = require("bluebird");
var redis = require("redis");
Promise.promisifyAll(redis.RedisClient.prototype);

var clientStore = null;
var clientPub = null;
// var logger = require('./logger');
module.exports = {
  getClientStore: getClientStore,
  getClientPub: getClientPub,
  initRedisClient: initRedisClient,
};

function getClientStore() {
  return clientStore;
}

function getClientPub() {
  return clientPub;
}

function initRedisClient(host, port, pass, db) {
  clientStore = redis.createClient(port, host);
  if (pass) {
    clientStore.auth(pass);
  }
  clientStore.on('error', function(err) {
    console.log(err);
  });
  clientStore.on('connect', function() {
    console.log('Connected to Redis server');
    if (db != null) {
      clientStore.select(db);
    }
  });
}
