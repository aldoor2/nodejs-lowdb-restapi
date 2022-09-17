
import * as taskService from '../services/task.service.js'

export const getAllTasks = (req, res) => {
  try {
    const allTasks = taskService.getAllTasks()
    res.json({ status: 'ok', data: allTasks })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export const getOneTask = (req, res) => {
  const {
    params: { taskId }
  } = req

  if (!taskId) {
    return res
      .status(400)
      .json({
        status: 'FAILED',
        data: { error: "Parameter ':taskId' can not be empty" }
      })
  }

  try {
    const task = taskService.getOneTask(taskId)
    res.json({ status: 'OK', data: task })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export const count = (req, res) => {
  res.json('counting tasks')
}

export const createNewTask = async (req, res) => {
  const { body } = req

  if (!body.title || !body.description) {
    return res
      .status(400)
      .send({
        status: 'FAILED',
        data: {
          error: "One of following keys is missing or is empty in request body: 'title', 'description'"
        }
      })
  }

  const newTask = {
    title: body.title,
    description: body.description,
  }

  try {
    const createdTask = await taskService.createNewTask(newTask)
    res.status(201).json({ status: 'OK', data: createdTask })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export const deleteOneTask = async (req, res) => {
  const {
    params: { taskId }
  } = req

  if (!taskId) {
    return res
      .status(400)
      .json({
        status: 'FAILED',
        data: { error: "Parameter ':taskId' can not be empty" }
      })
  }

  try {
    await taskService.deleteOneTask(taskId)
    res.status(204).json({ status: 'OK' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export const updateOneTask = (req, res) => {
  res.json('updating a task')
}