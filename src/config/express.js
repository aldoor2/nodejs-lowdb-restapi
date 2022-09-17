import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { PORT } from './env.js'
import tasksRoutes from '../routes/tasks.routes.js'

// Initialization
const app = express()

// Settings
app.set('port', PORT)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/tasks', tasksRoutes)

export default app