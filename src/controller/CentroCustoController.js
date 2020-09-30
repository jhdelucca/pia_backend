const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const usr_id = request.headers.authorization;

        const centro_custo = await connection('centro_custo').where('usr_id', usr_id).select('*');

        return response.json(centro_custo);
    },

    async indexUnico(request, response) {
        const usr_id = request.headers.authorization;
        const { id } = request.params;

        const centro_custo = await connection('centro_custo').where({'usr_id': usr_id,'id':id}).select('*').first();

        if(!centro_custo) {
            return response.status(204).json('No contents');
        }

        return response.json(centro_custo);
        
    },

    async create(request, response) {
        const { nome, tipo, valorCusto,limite } = request.body;
        const usr_id = request.headers.authorization;

        const user = await connection('usuarios')
        .where('id',usr_id)
        .select('*')
        .first();

        if (!user) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const [id] = await connection('centro_custo').insert({
            nome,
            usr_id,
            tipo,
            valorCusto,
            limite,
        });

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params;
        const usr_id = request.headers.authorization;

        const centro_custo = await connection('centro_custo').where('id', id).select('usr_id').first();


        if (centro_custo.usr_id != usr_id) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('centro_custo').where({'id':id,'usr_id':usr_id}).delete();

        return response.status(202).send("Deleteado com sucesso");
    },

    async update(request, response) {
        const { id } = request.params;
        const { nome, tipo, valorCusto,limite} = request.body;
        const usr_id = request.headers.authorization;

        const centro_custo = await connection('centro_custo').where('id', id).select('usr_id').first();

        if (centro_custo.usr_id != usr_id) {
            return response.status(401).json({ error: 'Operation not permited' });
        }
        
        await connection('centro_custo').where('id', id).update({
            nome: nome,
            tipo: tipo,
            valorCusto: valorCusto,
            limite: limite
        });


        return response.status(202).send("Alterado com sucesso");
    },

    async updateValor(request, response) {
        const { id } = request.params;
        const {valorCusto} = request.body;
        const usr_id = request.headers.authorization;

        const centro_custo = await connection('centro_custo').where('id', id).select('usr_id').first();

        if (centro_custo.usr_id != usr_id) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

         await connection('centro_custo').where('id', id).update({
            valorCusto: valorCusto,  
        });

        return response.status(202).send("Alterado com sucesso");
    }

}