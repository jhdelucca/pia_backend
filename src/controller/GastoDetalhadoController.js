const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const usr_id = request.headers.authorization;

        const users = await connection('usuarios').where('id', usr_id).select('*').first();

        if (!users) {
            return response.status(401).json({ error: 'Operation not permited' });
        }
        const gastos = await connection('gastos_detalhados').select('*');

        response.json(gastos);

    },

    async indexGasto(request, response) {

        const usr_id = request.headers.authorization;
        const {gasto_id} = request.params;

        const users = await connection('usuarios').where('id', usr_id).select('*').first();

        if (!users) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const gastos = await connection('gastos_detalhados').where('gasto_id', gasto_id).select('*');   

        if (!gastos) {
            return response.status(204).json('No contents');
        }

        response.json(gastos);
    },

    async indexGastoCusto(request, response) {

        const usr_id = request.headers.authorization;
        const { gasto_id, centro_custo_id } = request.query;


        const users = await connection('usuarios').where('id', usr_id).select('*').first();

        if (!users) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const gastos = await connection('gastos_detalhados').where({
            'gasto_id': gasto_id,
            'centro_custo_id': centro_custo_id
        }).select('*');

        if (!gastos) {
            return response.status(204).json('No contents');
        }

        response.json(gastos);
    },

    async create(request, response) {
        const { titulo, valor } = request.body
        const usr_id = request.headers.authorization;
        const { centro_custo_id, gasto_id } = request.query;

        const user = await connection('usuarios')
            .where('id', usr_id)
            .select('*')
            .first();

        if (!user) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const [id] = await connection('gastos_detalhados').insert({
            gasto_id,
            centro_custo_id,
            titulo,
            valor
        });

        return response.json({ id });

    },


    async delete(request, response) {
        const { id } = request.params;
        const usr_id = request.headers.authorization;

        const user = await connection('usuarios')
            .where('id', usr_id)
            .select('*')
            .first();

        if (!user) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('gastos_detalhados ').where('id', id).delete();

        return response.status(202).send("Deleteado com sucesso");
    }



}
