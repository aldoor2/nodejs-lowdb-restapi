import { v4 as uuid } from 'uuid'

import * as Task from '../models/Task.js'

export const getAllTasks = () => {
  try {
    const allTasks = Task.getAllTasks()
    return allTasks
  } catch (error) { throw error }
}

export const getOneTask = (taskId) => {
  try {
    const taskFound = Task.getOneTask(taskId)
    return taskFound
  } catch (error) { throw error }
}

export const createNewTask = async (newTask) => {
  const taskToInsert = {
    id: uuid(),
    ...newTask,
    createAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updateAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
  }

  try {
    const createdTask = Task.createNewTask(taskToInsert)
    return createdTask
  } catch (error) { throw error }
}

export const deleteOneTask = async (taskId) => {
  try {
    await Task.deleteOneTask(taskId)
  } catch (error) { throw error }
}

export const updateOneTask = async (taskId, changes) => {
  try {
    const updatedTask = await Task.updateOneTask(taskId, changes)
    return updatedTask
  } catch (error) { throw error }
}

export const countTasks = () => {
  try {
    const totalTasks = Task.countTasks()
    return totalTasks
  } catch (error) { throw error }
}