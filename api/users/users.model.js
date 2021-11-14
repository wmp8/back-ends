const db = require('../data/db-config.js');

function findBy(filter) {
    return db('users as u')
        .select('u.user_id', 'u.username', 'u.password', 'u.phone')
        .where(filter);
}

function findById(user_id) {
    return db('users as u')
        .select('u.user_id', 'u.username', 'u.password', 'u.phone')
        .where('u.user_id', user_id)
        .first();
}
async function add({ username, password, phone }) {
    const [newUserObject] = await db('users').insert({username, password, phone}, ['user_id', 'username', 'phone'])
    return newUserObject // { user_id: 7, username: 'foo', phone: 'xxxxxxx' }
}

module.exports = {
    add,
    findBy,
    findById,
};


// const db = require('../data/db-config')

// function getAllUsers() { return db('users') }



// module.exports = {
//     getAllUsers,
//     insertUser,
// }