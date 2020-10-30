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

        const trx = await connection.transaction();

        try {

        const user = await trx('usuarios')
            .where('id', usr_id)            
            .select('*')
            .first();

        if (!user) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        const [id] = await trx('gastos_detalhados').insert({
            gasto_id,
            centro_custo_id,
            titulo,
            valor
        });

        const gasto = await trx('gastos').where('id',gasto_id).select('*').first();

        if (!gasto) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await trx('gastos').where('id',gasto_id).update({
            valorGasto: gasto.valorGasto + valor,
        });

        const centro_custo = await trx('centro_custo').where('id',centro_custo_id).select('*').first();

        if (!centro_custo) {
            return response.status(401).json({ error: 'Operation not permited' });
        }

        console.log(centro_custo.tipo);

        if(centro_custo.tipo === 'CC') {
            centro_custo.valorCusto = centro_custo.valorCusto - valor;
        }else{
            centro_custo.valorCusto = centro_custo.valorCusto + valor;    
        }

        await trx('centro_custo').where('id',centro_custo_id).update({
            valorCusto: centro_custo.valorCusto,
        });


        await trx.commit();

        return response.json({ id });

    } catch (err) {
        await trx.rollback();
        console.log(err);

        return response.status(400).json({
            error: 'Unexpected erro while creating new class'
        })
    }

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
