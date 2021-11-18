const { lowerCase } = require('lower-case')
const db = require('../data/db-config.js');

function getAllUsers() {
    return db('users as u')
        .select('u.user_id', 'u.username', 'u.phone');
}

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
    const [newUserObject] = await db('users')
        .insert({ username: lowerCase(username), password, phone }, ['user_id', 'username', 'phone'])
    return newUserObject // { user_id: 7, username: 'foo', phone: 'xxxxxxx' }
}
const update = async (username, changes) => {
    const updatedInfo = await db('users')
        .where({ username })
        .update(changes, ['username', 'phone', 'password'])
    return updatedInfo
}

module.exports = {
    add,
    findBy,
    update,
    findById,
    getAllUsers,
};
