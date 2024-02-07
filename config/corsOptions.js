const { allowedOrigins } = require('./allowedOrigins.js')

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin){
      callback(null,true)
    }else{
      callback( new Error('No permitido por CORS'))
    }
  },
  optionsSuccessStatus: 200
};

module.exports = { corsOptions }