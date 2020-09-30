exports.up = function (knex) {
    return knex.schema.createTable('centro_custo', function (table) {
        table.increments();
        table.string('usr_id').notNullable();
        table.foreign('usr_id').references('id').inTable('usuarios');
        table.string('nome').notNullable();
        table.string('tipo', 2).notNullable();
        table.decimal('valorCusto').notNullable();
        table.decimal('limite').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('centro_custo');
};
