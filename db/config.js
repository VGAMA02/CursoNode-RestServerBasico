const mongoose = require('mongoose');
const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGOCNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
/*          useNewUrlParser: true, 
            useUnifiedTopology: true  */
        });

        console.log('Base de datos corriendo');
    }catch(err){
        console.log(err);
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}