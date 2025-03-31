import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  throw new Error('Admin credentials not found in environment variables')
}

// Admin user from environment variables
const ADMIN_USER = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
}

// Generate hashed password for admin user
const generateHashedPassword = async () => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash('admin123', salt)
}

// Initialize admin password
generateHashedPassword().then(hash => {
  ADMIN_USER.password = hash
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (email !== ADMIN_USER.email) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, ADMIN_USER.password)
    if (!validPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { email: ADMIN_USER.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    )

    res.json({
      success: true,
      token,
      user: { email: ADMIN_USER.email }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

export default router 