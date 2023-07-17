const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, ActualizarProducto, BorrarProducto } = require('../Controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const router = Router();

/* router.get('/',obtenerCategorias); */
router.get('/',obtenerProductos);

//obtener una producto por id - publico
router.get('/:id',[
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  
],obtenerProducto);

//crear producto - privado cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeProductoPorId),
    validarCampos
    ],crearProducto);

//Actualizar producto - privado cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],ActualizarProducto);

//Delete producto - privado solo admin persona con un token valido
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
],BorrarProducto);


module.exports = router;