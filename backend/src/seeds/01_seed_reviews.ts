import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('reviews').del()

  // Inserts seed entries
  await knex('reviews').insert([
    {
      name: 'John Doe',
      rating: 5,
      comment: 'Excellent service! The team was very professional and helpful.',
      created_at: new Date()
    }
  ])
} 