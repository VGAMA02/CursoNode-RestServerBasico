const express = require('express');
var cors = require('cors')
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middleWares();

        //Rutas de aplicacion
        this.routes();
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