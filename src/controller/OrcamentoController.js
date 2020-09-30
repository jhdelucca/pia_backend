const connection = require('../database/connection');


module.exports = {
    async index(request,response) {

        const orcamentos = await connection('orcamento')
        .select('*');

        return response.json(orcamentos);
    },

    async create(request,response) {
        
        const {mes,ano} = request.body;

        const [id] = await connection('orcamento').insert({
            mes,
            ano,
        });
        console.log(id);

        response.json({id})
    },

}