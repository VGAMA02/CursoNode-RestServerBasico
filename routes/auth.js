const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn,renovarToken } = require('../Controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jtw');
const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google',[
    check('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);

router.get('/',[
    validarJWT
], renovarToken);


module.exports = router;