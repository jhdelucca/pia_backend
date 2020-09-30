const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const usr_id = request.headers.authorization;
        const { orcamento_id } = request.query;

        const gasto = await connection('gastos').where({ 'usr_id': usr_id, 'orcamento_id': orcamento_id })
            .select('*');

        if (!gasto) {
            return response.status(204).json('No contents');
        }

        return response.json(gasto);
    },

    async indexUnico(request, response) {
        const usr_id = request.headers.authorization;
        const { id } = request.params;

        const gasto = await connection('gastos').where({
            'usr_id': usr_id,
            'id': id
        })
            .select('*').first();

        if (!gasto) {
            return response.status(204).json('No contents');
        }

        return response.json(gasto);
    },

    async create(request, response) {
        const { nome, valorMensal, valorGasto } = request.body
        const usr_id = request.headers.authorization;
        const { orcamento_id } = request.query;

        const user = await connection('usuarios')
            .where('id', usr_id)
            .select('*')
            .first();

        if (!user) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const orcamento = await connection('orcamento')
            .where('id', orcamento_id)
            .select('*')
            .first();

        if (!orcamento) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const [id] = await connection('gastos').insert({
            usr_id,
            orcamento_id,
            nome,
            valorMensal,
            valorGasto
        });

        return response.json({ id });

    },

    async update(request, response) {
        const { id } = request.params;
        const usr_id = request.headers.authorization;
        const { nome, valorMensal, valorGasto } = request.body;

        const gasto = await connection('gastos').where('id', id).select('usr_id').first();

        if (gasto.usr_id != usr_id ) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('gastos').where('id', id).update({
            nome: nome,
            valorMensal: valorMensal,
            valorGasto: valorGasto
        });

        return response.status(202).send("Alterado com sucesso")
    },

    async updateValor(request, response) {
        const { id } = request.params;
        const usr_id = request.headers.authorization;
        const { valorGasto } = request.body;

        const gasto = await connection('gastos').where('id', id).select('usr_id').first();

        if (gasto.usr_id != usr_id) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('gastos').where('id', id).update({
            valorGasto: valorGasto
        });

        return response.status(202).send("Alterado com sucesso")
    },

    async delete(request, response) {
        const { id } = request.params;
        const usr_id = request.headers.authorization;

        const gasto = await connection('gastos').where('id', id).select('usr_id').first();

        if (gasto.usr_id != usr_id) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('gastos').where('id', id).delete();

        return response.status(202).send("Deleteado com sucesso");
    }

}