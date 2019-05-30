exports.seed = async function(knex) {
  await knex('recipes').insert([
        {id: 1, name: 'Tex-Mex', dish_id: 2 },
        {id: 2, name: 'Granny\'s', dish_id: 2 },
        {id: 3, name: 'Old School', dish_id: 3 },
        {id: 4, name: 'Neapolitan', dish_id: 1 },
  ]);
};