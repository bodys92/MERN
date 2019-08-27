const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();

// middleware
// fill req.body
app.use(express.json());

//db connection

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/MERN_backend', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error('Could not connect to MongoDB... ', error));

// schemata

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  category: String,
  isAvailable: {
    type: Boolean,
    default: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task'
  }],
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: Number, // Time spend on project 
  belongTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

// models
// call after schemata
// @param - string - name of model, plular name in DB
// @param - schema

const Project = mongoose.model('Project', projectSchema);

const Task = mongoose.model('Task', taskSchema);

// validations

function validateProject(project) {
  const schema = {
    name: Joi.string().empty().max(24).required(),
    category: Joi.string().empty().max(24).required(),
    isAvailable: Joi.boolean()
  };
  // @param project - Object that have being inspected
  // @param schema
  // It can contains callback
    return Joi.validate(project, schema);
};

function validateTask(task) {
  const schema = {
    title: Joi.string().empty().max(24).required(),
    description: Joi.string().max(255),
    time: Joi.number().empty().integer().required(), 
    belongTo: Joi.any().empty().required()
  };
  return Joi.validate(task, schema);
};

// router 

// get projects

app.get('/api/projects', (req, res) => {
  Project.find((err, docs) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(docs);
  });
});

// get one project
app.get('/api/project/:id', (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.send(project);
  });
});

// create project
app.post('/api/project', (req, res) => {
  const {error} = validateProject(req.body);
  if (error){
    return res.status(400).json(error.message);
  }
  Project.create(req.body, (err, project) => {
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(project);
  });
});

// edit project
app.put('/api/project/:id', (req, res) => {
  const {error} = validateProject(req.body);
  if(error){
    return res.status(400).json(error.message);
  }
  Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, project) => {
    if (err){
      return res.status(400).json(err);
    }
    return res.status(200).json(project);
  })
});

// delete project
app.delete('/api/project/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id, (err, project) => {
    if (err){
      return res.status(400).json(err);
    }
    return res.status(200).send("ok");
  });
});

// get tasks from project
app.get('/api/project/:id/tasks', (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) {
      return res.status(400).json(err);
    }
    Task.find({belongTo: project["_id"]}, (err, tasks) => {
    if (err) {
      return res.status(400).json(err);
    }
    return res.status(200).json(tasks);
    })
  })
})

// create tasks in project
app.post('/api/project/:id/task', (req, res) => {
  req.body.belongTo = req.params.id;
  const {error} = validateTask(req.body);
  if (error) {
    return res.status(400).json(error.message);
  }
  Task.create(req.body, (err, task) => {
    if (err) {
      return res.status(400).json(err);
    }
    Project.findById(req.params.id, (err, project) => {
      if (err) {
        return res.status(400).json(err);
      }
      project.tasks.push(task);
      project.save();
      return
    })
    return res.status(200).json(task)
  })
})

app.get('/api/project/:id/taskstime', (req, res) => {
  Project.findById(req.params.id, (err, project) => {
    if (err) {
      return res.status(400).json(err);
    }
    Task.find({belongTo: project["_id"]}, (err, tasks) => {
    if (err) {
      return res.status(400).json(err);
    }
    const counter = [];
    counter.push(tasks.map(task => task.time));
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalTime = counter.reduce(reducer);
    return res.status(200).json(totalTime);
    })
  })
})



// methods
const port = 5000
app.listen(port, () => {console.log(`Listening on port ${port}...`)})

