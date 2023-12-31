const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/TaskManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json()); // Add JSON parsing middleware

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Registration Route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user in the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey);
    
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Login failed' });
  }
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Task = mongoose.model('Task', taskSchema);

function authenticateUser(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

app.post('/api/tasks', authenticateUser, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new task in the database and associate it with the logged-in user
    const newTask = new Task({ title, description, creator: req.userId });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ message: 'Task creation failed' });
  }
});


app.get('/api/tasks', authenticateUser, async (req, res) => {
  try {
    // Fetch tasks associated with the logged-in user
    const tasks = await Task.find({ creator: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Fetching tasks error:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});


// Update Task Route
app.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const { title, description } = req.body;
    const { taskId } = req.params;

    // Find the task by ID and update its fields
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      throw new Error('Task not found');
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Task update error:', error);
    res.status(500).json({ message: 'Task update failed' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
