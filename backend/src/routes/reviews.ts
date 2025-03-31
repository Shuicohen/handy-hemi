import { Router } from 'express'
import { ReviewModel } from '../models/Review'
import { verifyToken } from '../middleware/auth'
import { z } from 'zod'

const router = Router()

const reviewSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(1, 'Comment is required')
})

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await ReviewModel.query()
      .orderBy('created_at', 'desc')
    res.json({ success: true, data: reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Create a new review
router.post('/', async (req, res) => {
  try {
    const validatedData = reviewSchema.parse(req.body)
    const review = await ReviewModel.query().insert(validatedData)
    res.status(201).json({ success: true, data: review })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: error.errors[0].message })
    } else {
      console.error('Error creating review:', error)
      res.status(500).json({ success: false, message: 'Server error' })
    }
  }
})

// Delete a review (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    await ReviewModel.query().deleteById(id)
    res.json({ success: true, message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

export default router 