const { model, Schema } = require('mongoose');
const{} = require('dotenv').config();


const habitacionSchema = new Schema({
  numeroHab: Number,
  tipoHab: Number,
  precio: Number,
  descripcion: String,
  estado: Boolean,
  img: {
    data: Buffer,
    contentType: String
  },
  reservas: [{
    usuario: String,
    fechaInicio: Date,
    fechaFin: Date
  }]
});


const habitacion = model('habitacion', habitacionSchema);
module.exports = habitacion;