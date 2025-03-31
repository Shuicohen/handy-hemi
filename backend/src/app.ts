import express from 'express'
import cors from 'cors'
import contactRoutes from './routes/contact'
import authRoutes from './routes/auth'
import reviewsRoutes from './routes/reviews'

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/reviews', reviewsRoutes)

export default app 