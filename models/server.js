const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config.js');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base datos
        this.conectarDB();
        //Middlewares
        this.middleWares();

        //Rutas de aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleWares(){

        //Cors
        this.app.use(cors()); //cors -> cross domain access
        //Parseo y lectura del body
        this.app.use(express.json());
        ///Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/user.js'));

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Aplicacion corriendo en', this.port);
        });
    }
}

module.exports = Server;