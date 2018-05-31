exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('keyword').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('keyword').insert({name: 'study', category_id: '1'}),
        knex('keyword').insert({name: 'read', category_id: '1'}),
        knex('keyword').insert({name: 'review', category_id: '1'}),
        knex('keyword').insert({name: 'listen', category_id: '1'}),
        knex('keyword').insert({name: 'buy', category_id: '4'}),
        knex('keyword').insert({name: 'get', category_id: '4'}),
        knex('keyword').insert({name: 'pick up', category_id: '4'}),
        knex('keyword').insert({name: 'purchase', category_id: '4'}),
        knex('keyword').insert({name: 'acquire', category_id: '4'}),        
        knex('keyword').insert({name: 'see', category_id: '2'}),
        knex('keyword').insert({name: 'watch', category_id: '2'}),
        knex('keyword').insert({name: 'go to', category_id: '3'}),
        knex('keyword').insert({name: 'visit', category_id: '3'}),
        knex('keyword').insert({name: 'attend', category_id: '3'}),
        knex('keyword').insert({name: 'drop in', category_id: '3'})
      ]);
    });
};