import { v4 as uuidv4 } from 'uuid'

import { getConnection } from '../database.js'

export const getAllTasks = () => {
  try {
    const tasks = getConnection().data.tasks
    return tasks
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const getOneTask = (taskId) => {
  try {
    const db = getConnection()
    const { tasks } = db.data

    const taskFound = tasks.find((task) => task.id === taskId)
    if (!taskFound) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`
      }
    }

    return taskFound
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const createNewTask = async (newTask) => {
  try {
    const db = getConnection()
    const { tasks } = db.data

    const isAlreadyAdded = tasks.findIndex((task) => task.title === newTask.title) > -1
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Task with the title: '${newTask.title}', already exists`
      }
    }

    const taskToInsert = {
      id: uuidv4(),
      ...newTask,
      createAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      updateAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }

    tasks.push(taskToInsert)
    await db.write()
    return taskToInsert
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const deleteOneTask = async (taskId) => {
  try {
    const db = getConnection()
    const { tasks } = db.data

    const indexForDeletion = tasks.findIndex((task) => task.id === taskId)
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`
      }
    }

    tasks.splice(indexForDeletion, 1)
    await db.write()
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const updateOneTask = async (taskId, changes) => {
  try {
    const db = getConnection()
    const { tasks } = db.data

    const taskFound = tasks.find(t => t.id === taskId)
    if (!taskFound) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`,
      }
    }

    const isAlreadyAdded = tasks.findIndex((t) => t.title === changes.title) > -1
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Task with the title '${changes.title}' already exists`
      }
    }

    const updatedTask = {
      ...taskFound,
      ...changes,
      updateAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }

    const newTasks = tasks.map((t) => t.id === taskId ? updatedTask : t)
    db.data.tasks = newTasks
    await db.write()

    return updatedTask
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const countTasks = () => {
  try {
    const db = getConnection()
    const totalTasks = db.data.tasks.length
    return totalTasks
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}