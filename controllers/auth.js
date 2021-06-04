const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const Usuario = require('../models/usuario');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res) => {
    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if(!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id ); 

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
}

const googleSignin = async(req, res) => {

    const { id_token } = req.body;

    try {
        const { nombre, correo, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if(!usuario) {
            // Si el usuario no existe, entonces tengo que crearlo
            const data = {
                nombre, 
                correo,
                password: ':P',
                img, 
                google: true
            };
            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario esta borrado de la BD
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El token de Google no es válido'
        })
    }

}

module.exports = {
    login,
    googleSignin
}