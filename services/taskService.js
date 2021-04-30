var objectId = require('mongodb').ObjectId;
const { taskDB } = require("../db/taskDB");

const addTask = async (task, user) => {
  var assembledTask = {
    title: task.title,
    user: user,
    completed: task.completed,
  };
  try {
    return await taskDB().then(response => {
      response.insertOne(assembledTask);
    })
  } catch (e) {
    throw new Error(e.message);
  }
};

const getTasks = async (user) => {
  try {
    return await taskDB().then(response => {
      return response
        .find({ "user": user })
        .toArray()
        .then(data => {
          return data
        });
    })
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateOneTask = async (task, user) => {
  try {
    return taskDB().then(response => {
      return response.updateOne({ "_id": objectId(task._id) },
        {
          $set:
          {
            title: task.title,
            user: user._id,
            completed: task.completed
          }
        }
      ).then(data => {
        return data
      });
    })
  } catch (e) {
    throw new Error(e.message);
  }
}

const deleteOneTask = async (task) => {
  try {
    return taskDB().then(response => {
      return response.deleteOne({ "_id": objectId(task._id) },
      )
    })
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  addTask,
  getTasks,
  updateOneTask,
  deleteOneTask,
};
