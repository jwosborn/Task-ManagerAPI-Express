const { taskService } = require("../services");

const { createTask } = taskService;

const createTask = async (req, res) => {
  const { user, task } = req.body;
  try {
    await createTask(task, user._id);
    res.sendStatus(201);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = {
  createTask,
};
