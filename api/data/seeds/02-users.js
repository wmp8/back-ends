const users = [
    {
        username: 'iamauser',
        password: '$2a$08$5QmmHYtNTAuroUfZB0s04OgefCClNqyuI7SRO1RFehVK7o1BOY.U2',
        phone: '7131234567'
    },
    {
        username: 'iamausertoo',
        password: '$2a$08$5QmmHYtNTAuroUfZB0s04OgefCClNqyuI7SRO1RFehVK7o1BOY.U2',
        phone: '8321234567'
    },
    {
        username: 'iamdefinitelyauser',
        password: '$2a$08$5QmmHYtNTAuroUfZB0s04OgefCClNqyuI7SRO1RFehVK7o1BOY.U2',
        phone: '2811234567'
    },
]

exports.seed = function (knex, Promise) {
    return knex('users')
        // .truncate()
        .then(function () {
            return knex('users').insert(users);
        });
};

exports.users = users