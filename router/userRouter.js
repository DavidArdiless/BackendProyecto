const { Router } = require("express");
const route = Router();
const {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/tokenValidation");

route.post("/users", addUser);
route.get("/users", verifyToken, getAllUsers);
route.patch("/users/:userId", updateUser);
route.delete("/users/:userId", deleteUser);

module.exports = route;
