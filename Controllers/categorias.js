const { response } = require("express");
const { Categoria } = require('../models');

//obtenerCategoria
const obtenerCategorias = async(req, res = response) =>{
    /*  const {nombre = 'no name',page = '1'} = req.query; */
    const {limite = 5, desde = 0 } = req.query;
    const query = {estado:true}
    const [total,categorias] = await Promise.all([ //cpleccion de promesas
        Categoria.countDocuments(query),

        Categoria.find({estado:true}) //{estado} es un filtro tipo where en sql
        .populate('usuario','nombre')
        .skip(Number(desde))
        .limit(Number(limite))

    ]);
    res.json({
        total,
        categorias
    });
}
//obtenerCategoria por id
const obtenerCategoria = async(req, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    res.json(categoria);
}


////
const crearCategoria = async(req, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria);
}

//actualizar categoria
const ActualizarCategoria = async(req, res = response) =>{
    const {id} = req.params;
    const {estado,usuario,...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json(categoria)
}
//borrar categoria
const BorrarCategoria = async(req, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
    res.status(200).json({
        msg: 'Categoria Borrada',
        categoria
    })
}

module.exports = {
    crearCategoria,obtenerCategoria,obtenerCategorias,ActualizarCategoria,BorrarCategoria
}