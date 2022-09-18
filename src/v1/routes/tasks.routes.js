import { Router } from 'express'

import * as tasksController from '../../controllers/tasks.controller.js'

const router = Router()

router
  .get('/', tasksController.getAllTasks)
  .get('/count', tasksController.countTasks)
  .get('/:taskId', tasksController.getOneTask)
  .post('/', tasksController.createNewTask)
  .delete('/:taskId', tasksController.deleteOneTask)
  .patch('/:taskId', tasksController.updateOneTask)

export default router