const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
        let users = [
            {id: 1, username: 'usuario1', email: 'usuario1@mail.com', password: 'password1', active: true},
            {id: 2, username: 'usuario2', email: 'usuario2@mail.com', password: 'password2'},
            {id: 3, username: 'usuario3', email: 'usuario3@mail.com', password: 'password3'}
        ]
        for (const user of users) {
            user.password = await hashPassword(user.password)
        }

        return knex('users').insert(users);

    });
};
