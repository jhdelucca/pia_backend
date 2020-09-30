
exports.up = function(knex) {
    return knex.schema.alterTable('orcamento' , function(table) {
        table.decimal('limite');
    });
};

exports.down = function(knex) {
    return knex.schema.dropColumn('limite');
};
