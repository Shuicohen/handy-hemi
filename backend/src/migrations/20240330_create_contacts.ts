import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('contacts', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('phone')
    table.text('message').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('contacts')
} 