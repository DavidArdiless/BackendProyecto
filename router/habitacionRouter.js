const {Router} = require('express');
const route = Router();
const multer = require('multer'); 
const {addHabitacion, getHabitaciones, getHabitacion, updateHabitacion, deleteHabitacion} = require('../controllers/habitacionController')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post('/habitacion',upload.single('img'),addHabitacion)
route.get('/habitaciones',getHabitaciones)
route.get('/habitacion/:numero',getHabitacion)
route.patch('/habitacion/:numero',updateHabitacion)
route.delete('/habitacion/:numero',deleteHabitacion)
module.exports = route;