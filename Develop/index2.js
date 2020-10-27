// Import our required modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// Need to ask about this package. Seems like it is similar to util
const path = require("path");
// Importing local generateMarkdown file
const generateMarkdown = require("./utils/generateMarkdown");

// Promisify our writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

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
      }
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
You can find more of my work at [${answers.username}](https://github.com/${answers.username})`;
}

// // function to initialize program
async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateREADME(answers);

    await writeFileAsync("README.md", html);

    console.log("Generating README...");
  } catch(err) {
    console.log(err);
  }
}

init();
