
export const getAllTasks = (req, res) => {
  res.json('getting all tasks')
}

export const getOneTask = (req, res) => {
  res.json('getting a task')
}

export const count = (req, res) => {
  res.json('counting tasks')
}

export const createNewTask = (req, res) => {
  res.json('creating a task')
}

export const deleteOneTask = (req, res) => {
  res.json('deleting a task')
}

export const updateOneTask = (req, res) => {
  res.json('updating a task')
}