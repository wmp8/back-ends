exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id');
      users.string('username', 200).notNullable().unique();
      users.string('password', 200).notNullable();
      users.bigint('phone', 15).notNullable();
    })
    .createTable('plants', (plants) => {
      plants.increments('plant_id');
      plants.string('nickname', 200).notNullable();
      plants.string('species', 200).notNullable();
      plants.string('image_url', 200);
      plants.integer('user_id', 200).notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    })
    .createTable('schedules', sch => {
      sch.increments('schedule_id');
      sch.integer('plant_id')
      .notNullable()
      .references('plant_id')
      .inTable('plants')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      sch.integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      sch.string('water_frquency', 200).notNullable();
      
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('schedules')
    .dropTableIfExists('plants')
    .dropTableIfExists('users');
}
