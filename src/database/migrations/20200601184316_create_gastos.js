exports.up = function (knex) {
    return knex.schema.createTable('gastos', function (table) {
        table.increments();
        table.int('orcamento_id').notNullable();
        table.foreign('orcamento_id').references('id').inTable('orcamento');
        table.string('nome').notNullable();
        table.decimal('valorMensal').notNullable();
        table.decimal('valorGasto').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('gastos');
};
