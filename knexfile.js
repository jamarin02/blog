// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'blog',
      user:     'postgres',
      password: 'Test1ng'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'blog',
      user:     'postgres',
      password: 'Test1ng'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'blog',
      user:     'postgres',
      password: 'Test1ng'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
