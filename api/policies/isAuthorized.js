module.exports = function (req, res, next) {
  var token;
  //Check if authorization header is present
  if (req.headers && req.headers.authorization) {
    //authorization header is present
    var parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return responseHelper.json(401, res, 'Format is Authorization: Bearer [token]');
    }
  } else {
    //authorization header is not present
    return responseHelper.json(401, res, 'No authorization header was found.');
  }
  jwtService.verify(token, (err, decoded) => {
    if (err) {
      return responseHelper.json(401, res, 'Invalid Authorization token');
    }
    req.user = decoded;
    next();
  });
};
