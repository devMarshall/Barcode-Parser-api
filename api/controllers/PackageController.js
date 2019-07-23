/**
 * PackageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  async create(req, res) {
    try {
      return responseHelper.json(201, res, 'Package added successfully', req.body);
    } catch (err) {
      res.serverError(err);
    }
  },

};

