const axios = require('axios');
const Usuario = require('../models/Usuarios');
module.exports = {
    async index(req, res){

        const { user } = req.headers;

        const logged = await Usuario.findById(user);

        const users = await Usuario.find({
            $and: [
                {_id: {$ne: user}},
                {_id: {$nin: logged.likes}},
                {_id: {$nin: logged.dislikes}}
            ]
        })
            return res.json(users);
    },

    async store(req, res){
    const {username} = req.body;

    const userExist = await Usuario.findOne({user: username});

    if(userExist){
        return res.json(userExist);
    }

    const response = await axios.get(`https://api.github.com/users/${username}`);
    
    const { name, bio, avatar_url: avatar } = response.data;

    const usuario = await Usuario.create({
        name, 
        user: username, 
        bio, 
        avatar
    })

        return res.json(usuario);
    }
    
}