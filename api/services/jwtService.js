const jwt = require('jsonwebtoken');

module.exports = {
  sign(payload) {
    return jwt.sign({ data: payload }, sails.config.secret, { expiresIn: 10 * 24 * 60 * 60 });
  },
  verify(token, cb) {
    jwt.verify(token, sails.config.secret, cb);
  }
};
