exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('category').insert({name: 'books'}),
        knex('category').insert({name: 'Entertainment'}),
        knex('category').insert({name: 'places'}),
        knex('category').insert({name: 'products'}),
        knex('category').insert({name: 'other'})
      ]);
    });
};
