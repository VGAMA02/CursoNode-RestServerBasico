const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario,Producto } = require("../models");

const cargarArchivos = async(req, res = response) => {

    try{
        /* const nombre = await subirArchivo(req.files,['txt','md'],'textos'); */
        const nombre = await subirArchivo(req.files,undefined,'imgs');
        res.json({nombre})
    }catch(err){
        res.status(400).json({err})
    }
}

const ActualizarImagen = async(req, res = response) => {
    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`})
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id ${id}`})
            }
        break;      
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }
    //Limpiar imagenes previas
    try{
        /* console.log(modelo.img); */
        if(modelo.img){
          /*   console.log('existe'); */
            const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
            /* console.log(pathImagen); */
            if(fs.existsSync(pathImagen)){
                /* console.log('borrando'); */
                fs.unlinkSync(pathImagen);
            }
            else{
                console.log('NO borrando');
            }
        }
    }catch(err){
        return res.json(err)
    }


    nombre = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo)
}

const ActualizarImagenCloudinary = async(req, res = response) => {
    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`})
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id ${id}`})
            }
        break;      
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }
    //Limpiar imagenes previas
    try{
        /* console.log(modelo.img); */
        if(modelo.img){
            //limpiar
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length -1];
            const [public_id] = nombre.split('.');
            console.log(public_id);
            await cloudinary.uploader.destroy(public_id);
        }

        const {tempFilePath} = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
        await modelo.save();
        return res.json(modelo);
    }catch(err){
        return res.json(err);
    }


   /*  nombre = await subirArchivo(req.files,undefined,coleccion);
    modelo.img = nombre;
    await modelo.save(); */
    
}

const mostrarImagen = async(req, res = response) => {
    const {id,coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un usuario con el id ${id}`})
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({msg: `No existe un producto con el id ${id}`})
            }
        break;      
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'})
    }
    //mostrar imagenes previas
    try{
       /*  console.log(modelo.img); */
        if(modelo.img){
            console.log('existe');
            const pathImagen = path.join(__dirname,'../uploads', coleccion, modelo.img);
            /* console.log(pathImagen); */
            if(fs.existsSync(pathImagen)){
               return res.sendFile(pathImagen);
            }
        }
        else{
            const pathImagen = path.join(__dirname,'../assets/noImage.jpg');
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen);
             }
        }
    }catch(err){
        return res.json(err)
    }
   /*  res.json({msg: 'falta place holder'}) */
}

module.exports = {
    cargarArchivos,ActualizarImagen,mostrarImagen,ActualizarImagenCloudinary
}