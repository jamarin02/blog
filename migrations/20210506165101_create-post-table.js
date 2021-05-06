
exports.up = function(knex) {
  return knex.schema
      .createTable('posts', function (table) {
          table.increments().primary()
          table.string('title', 255).notNullable()
          table.string('excerpt', 255).notNullable()
          table.text('content').notNullable()
          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('updated_at').defaultTo(knex.fn.now())
          table.boolean('draft').notNullable().defaultTo('true')
          table.integer('user_id').references('id').inTable('users')
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
};
