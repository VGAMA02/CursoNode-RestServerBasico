const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoria, obtenerCategorias, ActualizarCategoria, BorrarCategoria } = require('../Controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();

//url/api/categorias

//obtener categorias publico
router.get('/',obtenerCategorias);

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  
],obtenerCategoria);

//crear categoria - privado cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
    ],crearCategoria);

//Actualizar categoria - privado cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],ActualizarCategoria);

//Delete categoria - privado solo admin persona con un token valido
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
],BorrarCategoria);

module.exports = router;