/**
 * Package.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    'carrier': {
      type: 'string',
      required: true
    },
    'sender': {
      type: 'string',
      required: true
    },
    'receiver': {
      type: 'string',
      required: true
    },
    'service': {
      type: 'string',
      required: true
    },
    'tracking_number': {
      type: 'string',
      required: true
    },
    'weight': {
      type: 'string',
      allowNull: true
    },
    'created_by': {
      type: 'string',
      required: true
    },
  },
};

