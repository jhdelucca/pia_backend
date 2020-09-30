exports.up = function(knex) {
    return knex.schema.createTable('orcamento' , function(table) {
        table.increments();
        table.string('usr_id');
        table.foreign('usr_id').references('id').inTable('usuarios');
        
        table.string('mes').notNullable();
        table.string('ano').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('orcamento');
};
