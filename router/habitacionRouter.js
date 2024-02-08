const { Router } = require("express");
const route = Router();
const {addHabitacion, getHabitaciones, getHabitacion, updateHabitacion, deleteHabitacion} = require('../controllers/habitacionController')

route.post('/habitaciones',addHabitacion)
route.get('/habitaciones',getHabitaciones)
route.get('/habitacion/:numero',getHabitacion)
route.patch('/habitacion/:numero',updateHabitacion)
route.delete('/habitacion/:numero',deleteHabitacion)
module.exports = route;