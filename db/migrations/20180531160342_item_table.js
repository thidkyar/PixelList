exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', function (table) {
    table.increments('id');
    table.string('name');
    table.date('due_date');
    table.boolean('status')
    table.integer('users_id').references('users.id');
    table.integer('category_id').references('category.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item');
};
