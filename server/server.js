require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
// Import Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const boardRoutes = require('./routes/boardRoutes');
app.use('/api/boards', boardRoutes);
const listRoutes = require('./routes/listRoutes');
app.use('/api/lists', listRoutes);
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Default Route
app.get('/', (req, res) => {
    res.send('Project Management Tool API is running...');
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
