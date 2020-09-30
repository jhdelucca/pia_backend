exports.up = function (knex) {
    return knex.schema.createTable('gastos_detalhados', function (table) {
        table.increments();
        
        table.integer('gasto_id')
        .references('gastos.id')
        .notNullable()
        .onDelete('CASCADE')
        
        table.integer('centro_custo_id').notNullable();
        table.foreign('centro_custo_id').references('id').inTable('centro_custo')
        
        table.string('titulo').notNullable();
        table.decimal('valor').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('gastos_detalhados');
};

