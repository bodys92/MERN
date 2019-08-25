const faker = require('Faker');
const mongoose = require('mongoose');

//db connection

console.log('start seeding');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/MERN_backend', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(error => console.error('Could not connect to MongoDB... ', error));



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

const Project = mongoose.model('Project', projectSchema);
const Task = mongoose.model('Task', taskSchema);

const getName = () => {
	return faker.Company.companyName()
};

const getCategory = () => {
	const categories = ['Testing', 'Design', 'Servis', 'Developing', 'Engineering'];
	const randomNum = Math.floor(Math.random() * 5);
	return categories[randomNum];
};

const getTitle = () => {
	return faker.Company.catchPhrase();;
};

const getText = () => {
	return faker.Lorem.sentence();
};

const getTime = () => {
	return Math.floor(Math.random() * 120);
}

function createProjectsList(countOfProjects, countOfTasks = 0) {
	console.log(`${countOfProjects}.times do new project`)

	let iProject = 0;

	do {
		iProject++;
		Project.create(project(), (err, project) => {
		    if(err){
		      return console.log(err);
		    };

	    	let iTask = 0;

		    while (iTask < countOfTasks) {
		    	iTask++;
			    Task.create(task(project._id), (err, task) => {
				    if(err){
					    return console.log(err);
			    	};
				    Project.findById(project._id, (err, parentProject) =>{
				      if (err) {
				        return res.status(400).json(err);
				      }
				      parentProject.tasks.push(task);
				      return parentProject.save();
				    })
			    	return console.log(`task for ${project._id} saved`);
			    });
		    };
			 
			return console.log("project saved");

		  });

	} while (iProject < countOfProjects);
};

const project = () => {
	const projectName = getName();
	const projectCategory = getCategory();
	const project = {
		name: projectName,
		category: projectCategory
	};

	return project;
};

const task = (projectId) => {
	const taskTitle = getTitle();
	const taskDescription = getText();
	const taskTime = getTime();
	const task = {
		title: taskTitle,
		description: taskDescription,
		belongTo: projectId,
		time: taskTime
	};

	return task;
};


createProjectsList(5, 4);


