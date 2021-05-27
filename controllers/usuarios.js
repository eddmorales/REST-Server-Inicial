
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const usuarioGet = async (req, res) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments();

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.json({
        // resp
        total,
        usuarios
    });
};

const usuarioPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json(usuario);
};

const usuarioPut = async(req, res) => {

    const id = req.params.id;
    const { _id, correo, password, google, ...resto} = req.body;

    if(password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuarioDelete = async (req, res) => {

    const { id } = req.params;

    // Eliminar un usuario fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
};


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}