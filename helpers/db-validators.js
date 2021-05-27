const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${rol} no es válido`);
    }
};

const correoExiste = async (correo = '') => {
    const correoExiste = await Usuario.findOne({correo});

    if(correoExiste) {
        throw new Error('El correo ya existe');
    }
};

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario) {
        throw new Error('El id no existe');
    }
};

module.exports = {
    esRolValido,
    correoExiste,
    existeUsuarioPorId
}