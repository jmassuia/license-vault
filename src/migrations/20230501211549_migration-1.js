// const knex = require('knex');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('Users', (table) => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.date('passwordResetAt');
        })
        .createTable('Licenses', (table) => {
            table.increments('id');
            table.integer('ownerId');
            table.string('productName').notNullable();
            table.string('productToken').notNullable();
            table.date('createdAt').notNullable();
            table.date('renewAt');
            table.date('expireAt').notNullable();
            table.boolean('isDisabled').notNullable();

            table.foreign('ownerId').references('id').inTable('Users');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable('Users').dropTable('Licenses');
};
