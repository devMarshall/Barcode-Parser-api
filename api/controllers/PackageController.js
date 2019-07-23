/* eslint-disable curly */
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
      const { trackID } = req.body;
      let possibleCarriers = guessCarrier(trackID);
      if (possibleCarriers.length > 0) return responseHelper.json(201, res, 'Package added successfully', { ...req.body, possibleCarriers });
      possibleCarriers = guessCarrier(trackID.slice(trackID.length - 12, trackID));
      return responseHelper.json(201, res, 'Package added successfully', { ...req.body, possibleCarriers });
    } catch (err) {
      res.serverError(err);
    }
  },

  async getPossibleCarriers(req, res) {
    try {
      const { possibleCarriers, trackID } = TrackerService.getCarriers(req.body.trackID);
      if (!possibleCarriers) return responseHelper.json(404, res, 'Carrier not found', null);
      if (possibleCarriers.length > 0) return responseHelper.json(200, res, 'Carrier retrieved successfully', { trackID, possibleCarriers });
      return responseHelper.json(404, res, 'Carrier not found', null);
    } catch (err) {
      res.serverError(err);
    }
  },

};

