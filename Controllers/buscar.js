const { response } = require("express");
const { Usuario,Categoria,Producto } = require("../models");
const { ObjectId } = require('mongoose').Types
const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    //busqueda insensible con expresion regular
    const regex = new RegExp(termino,'i'); //la expresions es el termino de busqueda pero la hace insensible a case sensitive
    const usuarios = await Usuario.find({
        $or: [{nombre:regex},{correo:regex},],
        $and: [{estado:true}]
    })
    return res.json({
        results: (usuarios)
    })
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }
    //busqueda insensible con expresion regular
    const regex = new RegExp(termino,'i'); //la expresions es el termino de busqueda pero la hace insensible a case sensitive
    const categorias = await Categoria.find({nombre:regex, estado:true})
    return res.json({
        results: (categorias)
    })
}

const buscarProductos = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }
    //busqueda insensible con expresion regular
    const regex = new RegExp(termino,'i'); //la expresions es el termino de busqueda pero la hace insensible a case sensitive
    const productos = await Producto.find({nombre:regex, estado:true}).populate('categoria','nombre');
    return res.json({
        results: (productos)
    })
}





const buscar = async(req, res = response) =>{
    const {coleccion, termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }
    switch(coleccion){
        case 'categorias':
            buscarCategorias(termino,res);
        break;
        case 'productos':
            buscarProductos(termino,res);
        break;
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }
/*     res.json({
        coleccion,
        termino
    }) */
}

module.exports = {
    buscar
}