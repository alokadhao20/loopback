
'use strict';
const RedisUtils = require('../../common/utils/redis-utils');
const datasources = require('../datasources');

module.exports = function(app) {
  RedisUtils.initRedisClient(datasources.redis.host, datasources.redis.port,
  datasources.redis.password, datasources.redis.database);
};
