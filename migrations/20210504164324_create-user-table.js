
exports.up = function(knex) {
  let createQuery = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
   )`
    return knex.raw(createQuery)
};

exports.down = function(knex) {
  let dropQuery = `DROP TABLE users`
    return knex.raw(dropQuery)
};
