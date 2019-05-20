'use strict';

/** @type Egg.EggPlugin */

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};

exports.oss = {
  enable: true,
  package: 'egg-oss',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
