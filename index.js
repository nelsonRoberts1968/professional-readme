
// TODO: Include packages needed for this application
//All packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const util = require('util');

// TODO: Create an array of questions for user input
// the table of contents in generateMarkdown.js
const questions = [{
  type: 'input',
  name: 'title',
  message: 'What is the title of your repository? (Required)',
  //validate to make sure THERE IS NO EMPTY value
  validate: nameInput => {
    if (nameInput) {
      return true;
    } else {
      //Console log to prompt the user to add title if the field is empty.Same applies to the rest of the README. prompts
      console.log('Please enter your repository title.');
      return false;
    }
  }
},
{
  type: 'input',
  name: 'description',
  message: 'What is the description of your repository? (Required)',
  validate: nameInput => {
    if (nameInput) {
      return true;
    } else {
      console.log('Please enter a description of the repository.');
      return false;
    }
  }
  },

{
  type: 'confirm',
  name: 'confirmInstallation',
  message: 'Is there an installation process?'
  },
{
  type: 'input',
  name: 'installation',
  message: 'Please list installation instructions.',
  //If there is installaltion steps required..allow the user to enter required steps
  when: ({ confirmInstallation }) => {
    if (confirmInstallation) {
      return true;
    } else {
      return false;
    }
  }
},

{ //confirm
  type: 'confirm',
  name: 'confirmUsage',
  message: 'Would you like to provide instructions on how to use your application?'
},
{ //if confirmed
  type: 'input',
  name: 'instructions',
  message: 'Please list instructions for using your application. It is recommended to add descriptive images later as well.',
  when: ({ confirmUsage }) => {
    if (confirmUsage) {
      return true;
    } else {
      return false;
    }
  }
},

{
  type: 'confirm',
  name: 'confirmContribution',
  message: 'How can other developers contribute to your repository?'
},
{
  type: 'input',
  name: 'contribution',
  message: 'Please explain how other developers may contribute to your project.',
  when: ({ confirmContribution }) => {
    if (confirmContribution) {
      return true;
    } else {
      return false;
    }
  }
},
{
  type: 'confirm',
  name: 'testConfirm',
  message: 'Is testing available?'
},
{
  type: 'input',
  name: 'testing',
  message: 'Please explain how users may test your application.',
  when: ({ testConfirm }) => {
    if (testConfirm) {
      return true;
    } else {
      return false;
    }
  }
},
{ //checkbox that allows license choice
  type: 'checkbox',
  name: 'license',
  message: 'Please choose a license.',
  choices: ['GNU AGPLv3', 'GNU GPLv3',
    'GNU LGPLv3', 'Mozilla Public License 2.0',
    'Apache License 2.0', 'MIT License', 'Boost Software License 1.0',
    'The Unlicense'],
  validate: nameInput => {
    if (nameInput) {
      return true;
    } else {
      console.log('Please select a license.');
      return false;
    }
  }
},
{
  type: 'input',
  name: 'username',
  message: 'What is your GitHub username? (Required)',
  validate: nameInput => {
    if (nameInput) {
      return true;
    } else {
      console.log('Please enter your GitHub username.');
      return false;
    }
  }
},
{
  type: 'input',
  name: 'email',
  message: 'What is your email address? (Required)',
  validate: nameInput => {
    if (nameInput) {
      return true;
    } else {
      console.log('Please enter your email.');
      return false;
    }
  }
},
{
  type: 'input',
  name: 'questions',
  message: 'Please list instructions for those who wish to contact you.',
  validate: (nameInput) => {
    if (nameInput) {
      return true;
    } else {
      return false;
    }
  }
}]; 

// TODO: Create a function to write README file
// this is an await in the async function
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, error => {
    if (error) {
      return console.log('Sorry there was an error : ' + error);
    }
  })
}


const createReadMe = util.promisify(writeToFile);
// TODO: Create a function to initialize app
// create async function with catch for errors
async function init() {
  try {
    const userAnswers = await inquirer.prompt(questions);
    console.log('Thank you! The current data is being processed into your README.md: ', userAnswers);
    // get markdown template from generateMarkdown.js passing the answers as parameter
    const myMarkdown = generateMarkdown(userAnswers);
    console.log(myMarkdown);
    //Create the README file after the markdown is completed. 
    await createReadMe('READMENEW.md', myMarkdown);
    
  } catch (error) {
    console.log('Sorry there was an error.' + error);
  }
};


