const { addTask, getTasks, updateOneTask, deleteOneTask } = require("../services/taskService");


const createTask = async (req, res) => {
  const { user, task } = req.body;
  try {
    await addTask(task, user._id);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const listTasks = async (req, res) => {
  const { user } = req.body;
  try {
    var tasks = await getTasks(user._id);
    res.json(tasks);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const updateTask = async (req, res) => {
  const { task, user } = req.body
  try {
    await updateOneTask(task, user);
    var tasks = await getTasks(user._id);
    res.json(tasks);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const deleteTask = async (req, res) => {
  const { task, user } = req.body
  try {
    await deleteOneTask(task);
    var tasks = await getTasks(user._id)
    res.json(tasks)
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask
};
