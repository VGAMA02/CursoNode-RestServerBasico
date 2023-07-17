const  validaCampos  = require('../middlewares/validar-campos');
const  validaJWT  = require('../middlewares/validar-jtw');
const  validaRoles = require('../middlewares/validar-roles');
const  validarArchivosSubir = require('../middlewares/validar-archivo');
module.exports ={
    ... validaCampos, 
    ...validaJWT,
    ...validaRoles, 
    ...validarArchivosSubir
}