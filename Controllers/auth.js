const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSingIn = async(req,res = response) => {
    const {id_token} = req.body;
    try{
        const {nombre, img, correo} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});
        if(!usuario){
            //si no existe crear usuario
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true,
                rol: 'USER_ROLE',
                estado:true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        else{

        }
        //si el usuario en DB No existe
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
    }catch(err){
        console.log(err);
       res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
       })
    }
  
}

const renovarToken = async(req,res = response) =>{
    const {usuario} = req;
    //generar JWT
    const token = await generarJWT(usuario.id);
    res.json({
        usuario,
        token
    })
}

module.exports = {
    login,googleSingIn,renovarToken
}