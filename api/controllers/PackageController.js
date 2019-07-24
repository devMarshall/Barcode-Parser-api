/* eslint-disable camelcase */
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
      const { user: { data: { id } } } = req;
      const { possibleCarriers, trackID } = TrackerService.getCarriers(req.body.trackID);
      if (possibleCarriers.length === 0) return responseHelper.json(404, res, 'Carrier not found', null);
      const data = await TrackerService.getDetails(trackID, possibleCarriers);
      const package = await Package.create({
        carrier: possibleCarriers[0],
        sender: data.activities[data.activities.length - 1]['location'],
        receiver: data.destination,
        service: data.service,
        tracking_number: trackID,
        weight: data.weight,
        created_by: id,
      }).fetch();
      return responseHelper.json(201, res, 'Package added successfully', { package });
    } catch (err) {
      responseHelper.error(err);
    }
  },

  async getPossibleCarriers(req, res) {
    try {
      const { possibleCarriers, trackID } = TrackerService.getCarriers(req.body.trackID);
      if (!possibleCarriers) return responseHelper.json(404, res, 'Carrier not found', null);
      if (possibleCarriers.length > 0) return responseHelper.json(200, res, 'Carrier retrieved successfully', { trackID, possibleCarriers });
      return responseHelper.json(404, res, 'Carrier not found', null);
    } catch (err) {
      responseHelper.error(err);
    }
  },

  async list(req, res) {
    try {
      const { per_page, page: _page } = req.query;
      const perPage = per_page || 20;
      const page = _page || 1;
      const criteria = {};
      const skip = perPage * (page - 1);
      const records = await Package.find({ where: criteria, limit: perPage, skip });
      const count = await Package.count(criteria);
      const meta = {
        page,
        prevPage: page > 1 ? page - 1 : false,
        perPage,
        nextPage: (count - (skip + perPage)) > 0 ? page + 1 : false,
        pageCount: Math.ceil(count / perPage),
        total: count,
      };
      return responseHelper.json(200, res, 'Packages reterived successfully', records, meta);
    } catch (err) {
      responseHelper.error(err);
    }
  },
};

