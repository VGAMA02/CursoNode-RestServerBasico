const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, ActualizarImagen, mostrarImagen, ActualizarImagenCloudinary } = require('../Controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivosSubir } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/',validarArchivosSubir,cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivosSubir, 
    check('id', 'el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],ActualizarImagenCloudinary);

router.get('/:coleccion/:id',[
    check('id', 'el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);


module.exports = router;