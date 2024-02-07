const { allowedOrigins } = require("../config/allowedOrigins");

const credentials = (rqt, rps, next) => {
  const origin = rqt.headers.origin;
  if(allowedOrigins.includes(origin)){
    rps.header('Access-Control-Allow-Credentials', true)
  }

  next()
};

module.exports = credentials;