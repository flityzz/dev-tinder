const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');
const routes = express.Router();
routes.get('/', (req, res) => {
    return res.json({message: `ola ${req.query.name}`});
 });

routes.get('/user', UsuarioController.index);
routes.post('/user', UsuarioController.store);
routes.post('/usuarios/:devId/likes', LikeController.store);
routes.post('/usuarios/:devId/dislikes', DislikeController.store);


module.exports = routes;