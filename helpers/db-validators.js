const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = '') =>{
    //verificar correo
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
       throw new Error(`Este correo: ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) =>{
    //verificar correo
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
       throw new Error(`El id: ${id} no existe`);
    }
}

////VALIDARORES DE CATEGORIAS ==>

const existeCategoriaPorId = async(id) =>{
    //verificar correo
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
       throw new Error(`El id: ${id} no existe`);
    }
}
const existeProductoPorId = async(id) =>{
    //verificar correo
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
       throw new Error(`El id: ${id} no existe`);
    }
}
module.exports = {
    esRoleValido,emailExiste,existeUsuarioPorId,existeCategoriaPorId,existeProductoPorId
}