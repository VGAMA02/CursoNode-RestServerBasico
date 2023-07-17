const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config.js');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }
      /*   this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'; */

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
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.usuarios,require('../routes/user.js'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Aplicacion corriendo en', this.port);
        });
    }
}

module.exports = Server;