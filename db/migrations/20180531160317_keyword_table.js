exports.up = function(knex, Promise) {
  return knex.schema.createTable('keyword', function (table) {
    table.increments('id');
    table.string('name');
    table.integer('category_id').references('category.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('keyword');
};
