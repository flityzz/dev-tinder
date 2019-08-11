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

        if(target.likes.includes(logged._id)){
            console.log('deu match');
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                    req.io.to(loggedSocket).emit('match', target);
            }

            if(targetSocket){
                    req.io.to(targetSocket).emit('match', logged);
            }
        }

        logged.likes.push(target._id);

        await logged.save();

        return res.json(logged);
    }
};