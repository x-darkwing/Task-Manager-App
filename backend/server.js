const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/taskdb')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const newTask = new Task({
        title: req.body.title
    });

    await newTask.save();
    res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
