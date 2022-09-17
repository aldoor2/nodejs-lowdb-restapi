
import * as taskService from '../services/task.service.js'

export const getAllTasks = (req, res) => {
  res.json('getting all tasks')
}

export const getOneTask = (req, res) => {
  res.json('getting a task')
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

export const deleteOneTask = (req, res) => {
  res.json('deleting a task')
}

export const updateOneTask = (req, res) => {
  res.json('updating a task')
}