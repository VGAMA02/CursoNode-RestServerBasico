const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req,res = response,next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(400).json({
            msg: 'No hay token en la peticion'
        })
    }

    try{
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        //leer el usuario corresponde al uid
        const usuario = await Usuario.findById(uid);
        //verificar si existe
        if(!usuario){
            return res.status(401).json({msg: 'Token no valido not user'})
        }
        //verificar si el uid tiene estado true
        if(!usuario.estado){return res.status(401).json({msg: 'Token no valido falseUser'})}

        req.usuario = usuario;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    console.log(token);
    //next();
}


module.exports = {
    validarJWT
}