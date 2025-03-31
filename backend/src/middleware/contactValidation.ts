import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

export const validateContact = (req: Request, res: Response, next: NextFunction) => {
  try {
    contactSchema.parse(req.body)
    next()
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      })
    } else {
      next(error)
    }
  }
} 