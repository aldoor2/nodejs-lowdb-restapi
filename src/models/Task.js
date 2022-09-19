import { getConnection } from '../config/db.js'

export const getAllTasks = () => {
  try {
    const allTasks = getConnection().data.tasks
    return allTasks
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const getOneTask = (taskId) => {
  try {
    const db = getConnection()

    const taskFound = db.data.tasks.find((t) => t.id === taskId)
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

    const isAlreadyAdded = db.data.tasks.findIndex(t => t.title === newTask.title) > -1
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Task with the title: '${newTask.title}', already exists`
      }
    }

    db.data.tasks.push(newTask)
    await db.write()
    return newTask
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

export const deleteOneTask = async (taskId) => {
  try {
    const db = getConnection()

    const indexForDeletion = db.data.tasks.findIndex((task) => task.id === taskId)
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find task with the id '${taskId}'`
      }
    }

    db.data.tasks.splice(indexForDeletion, 1)
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