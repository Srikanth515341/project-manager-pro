const express = require('express');
const { createTask, getTasks, deleteTask, updateTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Task Routes
router.post('/', authMiddleware, createTask);
router.get('/:listId', authMiddleware, getTasks);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
