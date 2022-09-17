import { v4 as uuidv4 } from 'uuid'

import { getConnection } from '../database.js'

export const getAllTasks = async () => {

}

export const getOneTask = () => {

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
      ...newTask,
      id: uuidv4(),
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

export const deleteOneTask = () => {

}

export const updateOneTask = () => {

}
