import Task from "../models/Task.js";

// Get all todos

// Get all tasks for logged-in user
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;  // coming from auth middleware
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new task
export const createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, date } = req.body;

    const task = new Task({
      userId,
      title,
      description,
      date,
    });

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update existing task
export const updateTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;

    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
