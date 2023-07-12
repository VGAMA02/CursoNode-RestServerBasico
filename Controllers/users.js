const { response,request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async(req = request, res = response) => {
   /*  const {nombre = 'no name',page = '1'} = req.query; */
   const {limite = 5, desde = 0 } = req.query;
   const query = {estado:true}


   /* const usuarios = await Usuario.find({estado:true}) //{estado} es un filtro tipo where en sql
    .skip(Number(desde))
    .limit(Number(limite)); */
        
    /* const total = await Usuario.countDocuments({estado:true}); */

    const [total,usuarios] = await Promise.all([ //cpleccion de promesas
        Usuario.countDocuments(query),

        Usuario.find({estado:true}) //{estado} es un filtro tipo where en sql
        .skip(Number(desde))
        .limit(Number(limite))

    ]);
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    
    const {nombre,correo,password,rol,estado} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol,estado});
    console.log(usuario);
   
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    //guardar
    await usuario.save();
    //console.log(body)
    res.json(usuario);
}

const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    console.log(id);
    const {_id, password, google,correo, ...resto} = req.body;

    //validar contra base de datos
    if(password){
         //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

   /* const usuario = await Usuario.findOneAndUpdate(id, resto, { new: true }) */
   let usuario = await Usuario.findByIdAndUpdate(id, resto,{ new: true });

   console.log(usuario);
    res.json({
        msg: 'put API - Controlador pu',
        usuario
    }); 
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador pa'
    });
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    //borrar fisicamente
    const usuario = await  Usuario.findByIdAndUpdate(id,{estado: false});
    res.json({
        usuario
    });
}


module.exports = {
    usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete
}
