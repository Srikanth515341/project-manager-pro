const Board = require('../models/Board');

// Create Board
exports.createBoard = async (req, res) => {
    try {
        const { title } = req.body;
        const newBoard = new Board({ title, owner: req.user.id });
        await newBoard.save();
        res.json(newBoard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Boards for Logged-in User
exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ owner: req.user.id });
        res.json(boards);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Board
exports.deleteBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) return res.status(404).json({ msg: 'Board not found' });

        if (board.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await board.remove();
        res.json({ msg: 'Board removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
