const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const addUser = async (request, response) => {
const {firstName,lastName,email,password,role} = request.body;

try {
const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    role
})

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds)
const hash = bcrypt.hashSync(password, salt);

newUser.password = hash;

await newUser.save()
 response.status(200).json({message: 'Usuario creado correctamente'})
} catch (error) {
    response.status(400).json({error})
}
};

const getAllUsers = async (request, response) => {
    try {
      const users = await User.find({})
      response.status(200).json(users)
    } catch (error) {
      response.status(400).json({ message: 'No se pudieron encontrar usuarios' })
    }
  }

  const deleteUser = async (request, response) => {
    const userId = request.params.id;
  
    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return response.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      response.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      response.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  };

  const updateUser = async (request, response) => {
    const userId = request.params.id;
    const { firstName, lastName, email, password, role } = request.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return response.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
      }
      if (role) user.role = role;
  
      await user.save();
  
      response.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      response.status(500).json({ error: 'Error al actualizar el usuario' });
    }
  };

module.exports = { addUser, getAllUsers, deleteUser, updateUser};