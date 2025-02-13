const List = require('../models/List');
const Board = require('../models/Board');

// Create List
exports.createList = async (req, res) => {
    try {
        const { title, boardId } = req.body;

        // Check if board exists
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ msg: 'Board not found' });
        }

        const newList = new List({ title, board: boardId });
        await newList.save();
        res.json(newList);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Lists for a Board
exports.getLists = async (req, res) => {
    try {
        const lists = await List.find({ board: req.params.boardId });
        res.json(lists);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete List
exports.deleteList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if (!list) return res.status(404).json({ msg: 'List not found' });

        await list.remove();
        res.json({ msg: 'List removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
