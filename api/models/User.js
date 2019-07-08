/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  fetchRecordsOnUpdate: true,

  attributes: {
    'firstname': {
      type: 'string',
      required: true
    },
    'lastname': {
      type: 'string',
      required: true
    },
    'email': {
      type: 'string',
      unique: true,
      required: true
    },
    'role': {
      type: 'string',
      required: true
    },
    'token': {
      type: 'string',
      allowNull: true,
    },
    'password': {
      type: 'string',
    },
  },

  beforeCreate: function (values, cb) {
    if (!values.prepass || !values.confirmation || values.prepass !== values.confirmation) {
      return cb({
        err: ['Password does not match confirmation']
      });
    }
    bcrypt.hash(values.prepass, 10, (err, hash) => {
      if (err) {
        return cb(err);
      }
      values.password = hash;
      delete values.prepass;
      delete values.confirmation;

      cb();
    });
  },
  customToJSON: function () {
    return _.omit(this, ['password', 'token']);
  },

};

