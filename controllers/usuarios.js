

const usuarioGet = (req, res) => {

    const query = req.query;
    
    res.json({
        msg: 'get API - controlador',
        query
    });
};

const usuarioPost = (req, res) => {

    const body = req.body;
    res.json({
        msg: 'post API - Controlador',
        body
    });
};

const usuarioPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuarioDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controlador'
    });
};


module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}