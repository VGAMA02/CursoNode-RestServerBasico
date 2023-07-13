const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const login = async(req,res) =>{
    const {correo,password} = req.body;

    try{

        //Verificar si email existe
        const usuario = await Usuario.findOne({ correo})
        if(!usuario){return res.status(400).json({msg:'Usuario / Password no son correctos -email'})}
        //verificar si el usuario esta activo
        if(!usuario.estado){return res.status(400).json({msg:'Usuario / Password no son correctos -false'})}
        //verificar la contraseña
        const validPass = bcryptjs.compareSync(password,usuario.password);
        if(!validPass){return res.status(400).json({msg:'Usuario / Password no son correctos -ps'})}
        //generar JWT
        const token = await generarJWT(usuario.id);
        return res.json({
            usuario,
            token
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }

    res.json({
        msg: 'Login Ok'
    });
}


module.exports = {
    login
}