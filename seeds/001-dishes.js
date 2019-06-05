exports.seed = async function(knex) {
  await knex('dishes').insert([
        {id: 1, name: 'pizza'},
        {id: 2, name: 'tacos'},
        {id: 3, name: 'burger'}
  ]);
};