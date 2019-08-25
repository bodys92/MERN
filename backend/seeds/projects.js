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

const Project = mongoose.model('Project', projectSchema);

const getName = () => {
	return faker.Company.companyName()
}

const getCategory = () => {
	const categories = ['Testing', 'Design', 'Servis', 'Developing', 'Engineering'];
	const randomNum = Math.floor(Math.random() * 5);
	return categories[randomNum];
}



function createProjectsList(countOfProjects) {
	console.log(`${countOfProjects}.times do new project`)

	let iterations = 0;

	do {
		iterations++;
		Project.create(project(), (err, project) => {
		    if(err){
		      return console.log(err);
		    }
		    return console.log("project saved");
		  });
	} while (iterations < countOfProjects);
};

const project = () => {
	const projectName = getName();
	const projectCategory = getCategory();
	const project = {
		name: projectName,
		category: projectCategory
	}

	return project 
}


createProjectsList(5);


