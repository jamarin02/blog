require('dotenv').config({path: './.env'})

const {DB_CLIENT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT} = process.env

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      database: DB_DATABASE,
      user:     DB_USERNAME,
      password: DB_PASSWORD,
      port: DB_PORT,
      host: DB_HOST
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
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
