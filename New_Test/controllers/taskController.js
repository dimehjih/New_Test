const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const { task, to_user, description, status } = req.body;

    const newTask = new Task({
      task,
      user_id: userId,
      to_user,
      description,
      status,
      date_created: new Date(),
      date_updated: new Date(),
    });

    await newTask.save();

    res.status(201).json({status: true, message: 'Task saved successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const ownerTaskId = req.params.user_id;

    const tasks = await Task.find({user_id: ownerTaskId});
    res.json({status:true, message: 'success', tasks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updates },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const deletedTask = await Task.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
