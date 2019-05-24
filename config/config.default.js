/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1558087735488_4255';

  // add your middleware config here
  config.middleware = [];

  // add your user config here


  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'nodesql',
    host: '47.99.113.195',
    port: '3306',
    username: 'root',
    password: '123456',
    timezone: '+08:00', // 东八时区
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '47.99.113.195', // Redis host
      password: '123456',
      db: 0,
    },
    agent: true,
  };

  config.sessionRedis = {
    key: 'EGG_SESSION',
    maxAge: 24 * 3600 * 1000,
    httpOnly: true,
    encrypt: false,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:8080'],
  };

  config.oss = {
    client: {
      accessKeyId: 'LTAItynAEvcPJHkE',
      accessKeySecret: '5cZb18s6ZeBxY6K9duVavWL6Aup7T5',
      bucket: 'egg-blog',
      endpoint: 'oss-cn-hangzhou.aliyuncs.com',
      timeout: '60s',
    },
  };

  config.multipart = {
    // fileSize: '50mb', // default 10M
    // whitelist: [
    //   '.png'
    // ]
  };

  config.alinode = {
    enable: true,
    appid: '79783',
    secret: '4538f408238e00b4384409aa8b5156f5801ef63e'
  };
  config.cors = {
    origin: 'http://localhost:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true   // 该属性允许session跨域
  };


  return config;
};
