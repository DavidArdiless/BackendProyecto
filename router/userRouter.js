const {Router} = require('express');
const route = Router();
const {addUser, getAllUsers, updateUser, deleteUser} = require('../controllers/userController')


route.post('/users',addUser)
route.get('/users', getAllUsers)
route.patch('/users/:userId',updateUser);
route.delete('/users/:userId',deleteUser)


module.exports = route;