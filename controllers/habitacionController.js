const multer = require('multer');
const Habitacion = require('../models/habitacionModel'); 
const addHabitacion = async (req, res) => {

  const { numeroHab, tipoHab, precio, descripcion, estado, img} = req.body;

  try {
    const nuevaHabitacion = new Habitacion({
      numeroHab,
      tipoHab,
      precio,
      descripcion,
      estado,
      img,
      reservas: []
    });

    await nuevaHabitacion.save();
    res.status(201).json({ message: 'Habitación guardada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la habitación.' });
  }
};

const getHabitaciones = async (req, res) => {
    try {
      const habitaciones = await Habitacion.find();
      
      // Asegúrate de manejar el caso donde no se encuentran habitaciones
      if (!habitaciones) {
        return res.status(404).json({ error: 'No se encontraron habitaciones.' });
      }
  
      res.json({ habitaciones });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };

  const getHabitacion= async (req, res) => {
    try {
      const habitacion = await Habitacion.findOne({ numeroHab: req.params.numero });
  
      if (!habitacion) {
        return res.status(404).json({ error: 'Habitación no encontrada.' });
      }
  
      res.json({ habitacion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };


  const deleteHabitacion = async (req, res) => {
    const numeroHab = req.params.numero;
  
    try {
      const habitacion = await Habitacion.findOneAndDelete({ numeroHab });
  
      if (!habitacion) {
        return res.status(404).json({ error: 'Habitación no encontrada.' });
      }
  
      res.status(200).json({ message: 'Habitación eliminada correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  
  
  const updateHabitacion = async (req, res) => {
    const numeroHab = req.params.numero;
    const { tipoHab, precio, descripcion, estado } = req.body;
  
    try {
      const habitacion = await Habitacion.findOneAndUpdate(
        { numeroHab },
        { tipoHab, precio, descripcion, estado,img },
        { new: true } // Devuelve el documento actualizado
      );
  
      if (!habitacion) {
        return res.status(404).json({ error: 'Habitación no encontrada.' });
      }
  
      res.status(200).json({ message: 'Habitación actualizada correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };
  
  module.exports = { addHabitacion, getHabitaciones, getHabitacion, deleteHabitacion, updateHabitacion };