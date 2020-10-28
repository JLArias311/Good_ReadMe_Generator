// Import our required modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
// Need to ask about this package. Seems like it is similar to util
const path = require("path");


// Promisify our writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

//  Global badgeURL that will be used in generateREADME function
let badgeURL = "";

// Defining Prompt function
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



// Defining function that grab answers from our answer object that wa created with the inquiery prompts, and display them on a README file
// I'm beggining this function with a conditional that gives variable badgeURL the URL to the chosen license
function generateREADME(answers) {
  switch (answers.license) {
    case "MIT":
      badgeURL = "![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)";
      break;
    case "APACHE 2.0":
      badgeURL = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
      break;
    case "GPL 3.0":
      badgeURL = "![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)";
      break;
    case "BSD 3":
      badgeURL = "![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)";
      break;
    default:
      badgeURL = "";
  }

  return `
# ${answers.title}
${badgeURL}

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
  } catch (err) {
    console.log(err);
  }
}

// Calling init function
init();
