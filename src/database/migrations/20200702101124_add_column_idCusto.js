
exports.up = function(knex) {
    return knex.schema.alterTable('gastos', function (table) {
        
        table.int('centro_custo_id');
        table.foreign('centro_custo_id').references('id').inTable('centro_custo');
  
    });
};

exports.down = function(knex) {
    return knex.schema.dropColumn('centro_custo_id');
};
