
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, title: 'Post title 1', excerpt: 'Post excerpt 1', content: 'Post content 1', draft: false, user_id: 1},
        {id: 2, title: 'Post title 2', excerpt: 'Post excerpt 2', content: 'Post content 2', draft: true, user_id: 2},
        {id: 3, title: 'Post title 3', excerpt: 'Post excerpt 3', content: 'Post content 3', user_id: 3},
      ]);
    });
};
