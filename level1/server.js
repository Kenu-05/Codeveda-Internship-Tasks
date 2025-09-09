const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory user data (temporary, no database yet)
let users = [];

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// CRUD operations
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json(user);
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = req.body;
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.json({ message: 'User deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
