const { response } = require("express");
const { Producto } = require("../models");


//obtenerCategoria
const obtenerProductos = async(req, res = response) =>{
    /*  const {nombre = 'no name',page = '1'} = req.query; */
    const {limite = 5, desde = 0 } = req.query;
    const query = {estado:true}
    const [total,productos] = await Promise.all([ //cpleccion de promesas
        Producto.countDocuments(query),

        Producto.find({estado:true}) //{estado} es un filtro tipo where en sql
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))

    ]);
    res.json({
        total,
        productos
    });
}
//obtenerCategoria por id
const obtenerProducto = async(req, res = response) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre')
    res.json(producto);
}


////
const crearProducto = async(req, res = response) =>{
    const {estado, usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre});
    if(productoDB){
        return res.status(400).json({
            msg: `La categoria ${productoDB.nombre} ya existe`
        })
    }
    //generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
}

//actualizar categoria
const ActualizarProducto = async(req, res = response) =>{
    const {id} = req.params;
    const {estado,usuario,...data} = req.body;
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json(producto)
}
//borrar categoria
const BorrarProducto = async(req, res = response) =>{
    const {id} = req.params;
    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
    res.status(200).json({
        msg: 'Producto Borrado',
        producto
    })
}

module.exports = {
    obtenerProducto,obtenerProductos,crearProducto,ActualizarProducto,BorrarProducto
}