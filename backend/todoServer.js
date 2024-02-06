  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const cors = require('cors');
  
  const app = express();
  const port = 3000;
  
  app.use(bodyParser.json());
  app.use(cors());
  
  // Connect to MongoDB
  mongoose.connect('mongodb+srv://samyanisahil007:Sahil007@cluster1.8rslbqw.mongodb.net/todoDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  
  
  // Define a Todo schema
  const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
  });
  
  // Create a Todo model
  const Todo = mongoose.model('Todo', todoSchema);
  
  app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        res.status(404).send();
      } else {
        res.json(todo);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/todos', async (req, res) => {
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
    };
  
    try {
      const createdTodo = await Todo.create(newTodo);
      res.status(201).json(createdTodo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.put('/todos/:id', async (req, res) => {
    const updatedTodo = {
      title: req.body.title,
      description: req.body.description,
    };
  
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, updatedTodo, { new: true });
      if (!todo) {
        res.status(404).send();
      } else {
        res.json(todo);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.delete('/todos/:id', async (req, res) => {
    try {
      const result = await Todo.findByIdAndDelete(req.params.id);
      if (!result) {
        res.status(404).send();
      } else {
        res.status(200).send();
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
// module.exports = app;
// app.listen(3000)
