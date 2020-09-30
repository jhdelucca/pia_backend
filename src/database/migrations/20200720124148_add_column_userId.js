exports.up = function(knex) {
    return knex.schema.alterTable('gastos', function (table) {
        
        table.integer('usr_id')
        .references('usuarios.id')
        .onDelete('CASCADE')
        
  
    });
};

exports.down = function(knex) {
    return knex.schema.dropColumn('usr_id');
};
