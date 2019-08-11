const Usuario = require('../models/Usuarios');

module.exports = {
    async store(req, res) {

        const { devId } = req.params;
        const { user } = req.headers;

        const logged = await Usuario.findById(user);
        const target = await Usuario.findById(devId);

        if(!target){
            return res.status(400).json({error: 'usuario nao existe'})
        }

        logged.dislikes.push(target._id);

        await logged.save();

        return res.json(logged);
    }
};