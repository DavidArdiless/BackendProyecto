require ('dotenv').config();
require ('../database/database');
const express = require ('express');
const app = express();
const addHabitacion =require('../router/habitacionRouter');
const getHabitaciones= require('../router/habitacionRouter');
const getHabitacion = require('../router/habitacionRouter');
const deleteHabitacion = require('../router/habitacionRouter');
const updateHabitacion = require('../router/habitacionRouter');
const addUser = require('../router/userRouter');
const getAllUsers = require('../router/userRouter');
const deleteUser = require('../router/userRouter');
const updateUser = require('../router/userRouter');
app.use(express.json());


app.use('/',addUser);
app.use('/',addHabitacion);
app.use('/',getHabitaciones);
app.use('/',getAllUsers);
app.use('/',getHabitacion);
app.use('/',updateUser);
app.use('/',deleteUser);
app.use('/',updateHabitacion);
app.use('/',deleteHabitacion);


app.listen (process.env.PORT , () => {
    console.log(`escuchando en el puerto ${process.env.PORT}`)
}) 
