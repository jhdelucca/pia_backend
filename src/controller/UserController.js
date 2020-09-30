const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const { indexUnico } = require('./CentroCustoController');

module.exports = {
    
    async index(request,response) {
        const users = await connection('usuarios').select('*');
        response.json({'Usuarios' : users});
    }, 
    
    async create(request,response) {

        const {nome,email} = request.body;
        const id = request.headers.authorization;


       // const id = generateUniqueId();

        const users = await connection('usuarios').select('*');
        
        for(let i = 0; i < users.length; i++) {
            if( users[i].email == email || users[i].id == id) {
                return response.status(403).json({error: 'Requisicao Proibida. Email já existente'});  
            }
        }

      const tes =  await connection('usuarios').insert({
            id,
            nome,
            email,
        })
        console.log(tes);
        return response.status(201).json({ 'ID gerado' : id });
    },

    async logar(request,response) {
        const {id,email} = request.body;

        const user = await connection('usuarios')
        .where({'id':id , 'email':email})
        .select('nome')
        .first();

        if(!user) {
            return response.status(400).json({error: 'No User found with this ID or email'});
        }

        return response.json(user);
    }
}