import express from 'express'
import dotenv from 'dotenv'
import app from './app'
import db from './config/database'

// Load environment variables
dotenv.config()

const port = process.env.PORT || 5000

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Something broke!' })
})

// Test database connection and start server
db.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful')
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  })
  .catch((err: Error) => {
    console.error('Database connection failed:', err)
    process.exit(1)
  }) 