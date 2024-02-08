const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (request, response, next) => {
  let token = request.header("Authorization");

  if (token.startsWith("Bearer")) {
    token = token.slice(7, token.length).trimleft();
  }
  jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
    if (error) {
      return response.status(400).json(error);
    }
    next();
  });
};

module.exports = { verifyToken };
