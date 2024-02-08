const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user)
      return response.status(400).json({ message: "usuario no existente" });

    const isMatch = bcrypt.compareSync(passowrd, user.password);
    if (!isMatch)
      return response.status(400).json({ message: "password invalido" });

    jwt.sign({ user }, process.env.TOKEN_KEY, {
      expiresIn: "60s",
    });

    response.status(200).json({ token, user });
  } catch (error) {
    response.status(500).json({ message: error });
  }
};

module.exports = { loginUser };
