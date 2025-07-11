const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 👈 Load environment variables

const app = express();
const PORT = process.env.PORT || 5000; // Use from env or default 5000

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection using env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// Mongoose model
const Message = mongoose.model('Message', new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
}));

// POST route to save contact form data
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await Message.create({ name, email, message });
    res.status(200).json({ message: 'Message saved successfully' });
  } catch (err) {
    console.error('❌ Error saving message:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
console.log(process.env.MONGO_URI); // Log the MongoDB URI for debugging
});

