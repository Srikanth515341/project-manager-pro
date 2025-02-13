const Task = require('../models/Task');
const List = require('../models/List');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, listId, dueDate } = req.body;

        // Check if list exists
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ msg: 'List not found' });
        }

        const newTask = new Task({ title, description, list: listId, dueDate });
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Tasks for a List
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ list: req.params.listId });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Task (Move Task Between Lists)
exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, listId } = req.body;
        let task = await Task.findById(req.params.id);
        
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Update task details
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;

        // Allow moving task to a different list
        if (listId) {
            const newList = await List.findById(listId);
            if (!newList) return res.status(404).json({ msg: 'Target list not found' });
            task.list = listId;
        }

        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
