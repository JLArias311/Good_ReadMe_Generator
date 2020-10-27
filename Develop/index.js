
// Import our required modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// Need to ask about this package
const path = require("path");
// Importing local generateMarkdown file
const generateMarkdown = require("./utils/generateMarkdown");

// Promisify our writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
// Going to go back to this method if I have the time
// const questions = [
//     "What is your GitHub username?", 
//     "What is your email address?", 
//     "What is your project's name?",
//     "Please write a short description of your project",
//     "What kind of license should your project have?",
//     "What command should be run to install dependencies?",
//     "What command should be run to run tests?",
//     "What does the user need to know about using the repo?",
//     "What does the user need to know about contributing to the repo?"
// ];

// Defining the promptUser function
// Creating questions
function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?"
      },
      {
        type: "input",
        name: "title",
        message: "What is your projects name?"
      },
      {
        type: "input",
        name: "description",
        message: "Please write a short description of your project?"
      },
      {
        type: "list",
        name: "license",
        message: "What kind of license should your project have?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
      },
      {
        type: "input",
        name: "dependencies",
        message: "What command should be run to install dependencies?"
      },
      {
        type: "input",
        name: "tests",
        message: "What command should be run to run tests?"
      },
      {
        type: "input",
        name: "usage",
        message: "What does the user need to know about using the repo?"
      },
      {
        type: "input",
        name: "contribute",
        message: "What does the user need to know about contributing to the repo?"
      },
    ]);
  }

function generateREADME(answers) {
    return `
    # ${answers.title}
    ![GitHub license] ${answers.license}

    ## Description

    ${answers.description}

    ## Table of Contents

    *[Installation](#installation)

    *[Usage](#usage)

    *[License](#license)

    *[Contributing](#contributing)

    *[Tests](#tests)

    *[Questions](#questions)

    ## Installation

    To install necessary dependencies, run the following command:
    ...
    ${answers.dependencies}
    ...

    ## Usage

    ${answers.usage}

    ## License

    This project is licensed under the ${answers.license} license.

    ## Contributing

    ${answers.contribute}

    ## Tests

    To run tests, run the following command:
    ...
    ${answers.tests}
    ...

    ## Questions

    If you have any questions about the repo, open an issue or contact me directly at ${answers.email}.
    You can find more of my work at [${answers.username}](https://github.com/${answers.username}).`;
  }

  // Call prompt user to kick off our inquirer prompts
// Grab the answers, place them in a variable function call
promptUser()
.then(function(answers) {
  const readMe = generateREADME(answers);

  // Write contents of html to index.html
  return writeFileAsync("README.md", readMe);
})
.then(function() {
  console.log("Generating README...");
})
.catch(function(err) {
  console.log(err);
});



  
// function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();
