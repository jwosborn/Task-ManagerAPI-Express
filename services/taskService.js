const { taskDB } = require("../db");

const createTask = async (task, user) => {
  var assembledTask = {
    title: task.title,
    user: user._id,
    completed: task.completed,
  };
  try {
    return await taskDB.insertOne(assembledTask);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createTask,
};
