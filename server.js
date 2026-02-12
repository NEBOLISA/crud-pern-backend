import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import { sql } from './config/db.js'
import path from 'path'
import { isSpoofedBot } from '@arcjet/inspect'
import { aj } from './lib/arcjet.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
app.use(helmet({
    contentSecurityPolicy:false
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
const __dirname = path.resolve()

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }) // Deduct 5 tokens from the bucket
    console.log('Arcjet decision', decision)

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: 'Too many requests' })
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: 'No bots allowed' })
      } else {
        return res.status(403).json({ error: 'Forbidden' })
      }
    } else if (decision.ip.isHosting()) {
      return res.status(403).json({ error: 'Forbidden' })
    } else if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    next()
  } catch (error) {
    console.log('Arcjet error', error)
    next(error)
  }
})
app.use('/api/products', productRoutes)
async function initDB() {
  try {
    await sql`
        
        
        CREATE TABLE IF NOT EXISTS products (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid()  ,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `
    console.log('Database initialized successfully')
  } catch (error) {
    console.log('Database connection error:', error)
  }
}
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('/*splat', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
