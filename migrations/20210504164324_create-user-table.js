
exports.up = function(knex) {
  return knex.schema
      .createTable('users', function (table) {
        table.increments().primary()
        table.string('username', 255).notNullable().unique()
        table.string('email', 255).notNullable().unique()
        table.string('password', 255).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.boolean('active').notNullable().defaultTo('false')
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
