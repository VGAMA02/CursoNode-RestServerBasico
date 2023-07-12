const { Router } = require('express');
const { check } = require('express-validator');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosPatch, 
    usuariosDelete } = require('../Controllers/users');
const { esRoleValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/',usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId().bail(),
    check('id').custom(existeUsuarioPorId).bail(),
    check('rol').custom(esRoleValido).bail(),
    validarCampos
],usuariosPut);


router.post('/',[ //middleware, los middlewares son funciuones que se ejecutan antes de otras.
    check('nombre','EL nombre es oligatorio').not().isEmpty(),
    check('password','La contraseña es oligatoria y necesita tener mas de 6 letras').isLength({min:6}),
    check('correo','EL correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    /* check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), */
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.patch('/',usuariosPatch);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId().bail(),
    check('id').custom(existeUsuarioPorId).bail(),
    validarCampos
],usuariosDelete);
module.exports = router;