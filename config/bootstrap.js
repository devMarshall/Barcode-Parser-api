/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const _ = require('lodash');
const Raven = require('raven');
const ResponseHelper = require('@dsninjas/response');
const { guessCarrier } = require('shipit');
const axios = require('axios');

module.exports.bootstrap = async function (cb) {
  global._ = _;
  global.axios = axios;
  global.Raven = Raven;
  global.guessCarrier = guessCarrier;
  process
    .on('unhandledRejection', (reason, p) => {
      console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', (err) => {
      console.error(err, 'Uncaught Exception thrown');
      process.exit(1);
    });
  Raven.config(sails.config.settings.raven.configUrl).install();
  global.responseHelper = new ResponseHelper(Raven);
  cb();
};
