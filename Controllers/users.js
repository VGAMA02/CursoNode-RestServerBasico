const { response,request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const {nombre = 'no name',page = '1'} = req.query;
    res.json({
        msg: 'get API - Controlador',
        nombre,
        page
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    //console.log(body)
    res.json({
        msg: 'post API - Controlador p',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API - Controlador pu',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador pa'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador de'
    });
}


module.exports = {
    usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete
}
