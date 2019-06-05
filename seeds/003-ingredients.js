exports.seed = async function(knex) {
  await knex('ingredients').insert([
        {id: 1, name: 'cup of corn flour'},
        {id: 2, name: 'cup of wheat flour'},
        {id: 3, name: 'gram of butter'},
        {id: 4, name: 'tomato'},
        {id: 5, name: 'gram of mozzarella cheese'},
        {id: 6, name: 'pounds ground beef'},
        {id: 7, name: 'leaves of lettuce'},
        {id: 8, name: 'gram of cheddar cheese'},
        {id: 9, name: 'avocado'},
        {id: 10, name: 'tbs of olive oil'}
  ]);
};