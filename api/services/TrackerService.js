/* eslint-disable curly */
module.exports = {
  getCarriers(trackID) {
    let possibleCarriers = guessCarrier(trackID);
    if (possibleCarriers.length > 0) return { possibleCarriers, trackID };
    if (trackID.length > 20) {
      trackID = trackID.slice(trackID.length - 12, trackID);
      possibleCarriers = guessCarrier(trackID);
      return { possibleCarriers, trackID };
    }
    return { possibleCarriers: [], trackID };
  },

  async getDetails(trackID, possibleCarriers) {
    const { data } = await axios.get(`http://shipit-api.herokuapp.com/api/carriers/${possibleCarriers[0]}/${trackID}`);
    return data;
  }

};
