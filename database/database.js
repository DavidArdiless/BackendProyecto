require('dotenv').config();
const mongoose =require ('mongoose');

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
         useNewUrlParser : true,
         useUnifiedTopology: true
        })
        console.log ('Conexion Exitosa a la DB!')
    } catch (error) {
        console.log('No se pudo conectar a la DB')
    }
};

connectionDB();

module.exports = {connectionDB}
