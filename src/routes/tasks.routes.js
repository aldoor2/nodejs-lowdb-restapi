import { Router } from 'express'

import tasksController from '../controllers/tasks.controller.js'

const router = Router()

router.get('/', tasksController.getAllTasks)

export default router