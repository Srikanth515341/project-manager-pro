const express = require('express');
const { createList, getLists, deleteList } = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// List Routes
router.post('/', authMiddleware, createList);
router.get('/:boardId', authMiddleware, getLists);
router.delete('/:id', authMiddleware, deleteList);

module.exports = router;
