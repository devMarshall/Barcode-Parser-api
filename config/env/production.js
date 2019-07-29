module.exports = {
  port: process.env.PORT || 1337,
  secret: process.env.SECRET,
  datastores: {
    mongo: {
      adapter: require('sails-mongo'),
      url: process.env.MONGO_URL,
    }
  },
  models: {
    datastore: 'mongo',
    migrate: 'safe',
  },
  blueprints: {
    rest: false,
    actions: false,
    shortcuts: false,
  },
  session: {
    cookie: {
      secure: true,
    }
  },
  sockets: {
    onlyAllowOrigins: [],
  },
  settings: {
    raven: {
      configUrl: process.env.RAVEN_CONFIG_URL,
    }
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: '*',
      allowCredentials: true,
      allowRequestMethods: 'GET,PUT,POST,OPTIONS,HEAD',
      allowRequestHeaders: 'Authorization, content-type',
    },
  }
};
