const multer = require('multer');
const Habitacion = require('../models/habitacionModel'); // Cambiado a Habitacion

const addHabitacion = async (req, res) => {
  const storage = multer.memoryStorage(); // Almacenar en memoria para luego convertir a Buffer
  const upload = multer({ storage: storage });
  const { numeroHab, tipoHab, precio, descripcion, estado } = req.body;

  try {
    const nuevaHabitacion = new Habitacion({
      numeroHab,
      tipoHab,
      precio,
      descripcion,
      estado,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });

    await nuevaHabitacion.save();
    res.status(201).json({ message: 'Habitación con imagen guardada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la habitación con imagen.' });
  }
};

const getHabitaciones = async (req, res) => {
    try {
      const habitaciones = await Habitacion.find();
      
      // Asegúrate de manejar el caso donde no se encuentran habitaciones
      if (!habitaciones) {
        return res.status(404).json({ error: 'No se encontraron habitaciones.' });
      }
  
      const habitacionesConImagen = habitaciones.map(habitacion => {
        return {
          ...habitacion._doc,
          img: {
            data: habitacion.img.data.toString('base64'),
            contentType: habitacion.img.contentType,
          },
        };
      });
  
      res.json({ habitaciones: habitacionesConImagen });
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
  
      const habitacionConImagen = {
        ...habitacion._doc,
        img: {
          data: habitacion.img.data.toString('base64'),
          contentType: habitacion.img.contentType,
        },
      };
  
      res.json({ habitacion: habitacionConImagen });
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
        { tipoHab, precio, descripcion, estado },
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