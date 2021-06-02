
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conexión a la base de datos
        this.connectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    middlewares() {

        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }
}


module.exports = Server;