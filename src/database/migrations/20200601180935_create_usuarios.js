exports.up = function(knex) {
  return knex.schema.createTable('usuarios' , function(table) {
    table.string('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
