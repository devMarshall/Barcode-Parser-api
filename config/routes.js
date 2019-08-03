/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'POST /user/signup': {
    controller: 'UserController',
    action: 'signup',
  },
  'POST /user/login': {
    controller: 'UserController',
    action: 'login',
  },
  'GET /user': {
    controller: 'UserController',
    action: 'read',
  },
  'POST /carrier': {
    controller: 'PackageController',
    action: 'getPossibleCarriers',
  },
  'POST /package': {
    controller: 'PackageController',
    action: 'create',
  },
  'GET /package': {
    controller: 'PackageController',
    action: 'list',
  },

  'DELETE /package/:id': {
    controller: 'PackageController',
    action: 'delete',
  },

};
