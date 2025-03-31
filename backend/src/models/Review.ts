import { Model } from 'objection'

export interface Review {
  id: number
  name: string
  rating: number
  comment: string
  created_at: Date
}

export class ReviewModel extends Model implements Review {
  id!: number
  name!: string
  rating!: number
  comment!: string
  created_at!: Date

  static get tableName() {
    return 'reviews'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'rating', 'comment'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        rating: { type: 'integer', minimum: 1, maximum: 5 },
        comment: { type: 'string', minLength: 1 },
        created_at: { type: 'string', format: 'date-time' }
      }
    }
  }
} 