// This file has the functions that prompts the user with inqurier and handles the actions

// Import Inquirer module
const inquirer = require("inquirer");

// Import content for prompts (destructured)
const {
    initPrompt,
    employeePrompt,
    finalizeTeam,
    redirect,
    removeEmployee,
} = require("./questions");

// Classes extending Employee Class
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

// Initialize Team Array
let team = [];
// Menu State
let keepGoing = true;

const red = "\u001b[31m";

// Instantiate class based on role and add to team
function addEmployee({ role, name, id, email, officeNumber, github, school }) {
    role === "Engineer"
        ? team.push(new Engineer(name, id, email, github))
        : role === "Intern"
        ? team.push(new Intern(name, id, email, school))
        : team.push(new Manager(name, id, email, officeNumber));
}

// Prompt and remove selected employee with id from team array
async function handleRemove() {
    const { id, answer } = await inquirer.prompt(removeEmployee);
    if (answer === true) {
        team = team.filter(employee => employee.id !== id);
        console.log(red, `***Employee with ID ${id} has been removed***`);
    }
}

// Menu to add employee, remove employee, or finish build
async function handleRedirect() {
    let { choice } = await inquirer.prompt(redirect);
    switch (choice) {
        case "Add Employee":
            await buildEmployee();
            break;
        case "Remove Employee":
            await handleRemove();
            break;
        case "Build Profile":
            await confirmBuild();
            break;
    }
}

// Prompt user input to create employee
async function buildEmployee() {
    let employee = await inquirer.prompt(employeePrompt);
    addEmployee(employee);
}

// Confirmation to build profile or to continue
async function confirmBuild() {
    console.log(team);
    const { answer } = await inquirer.prompt(finalizeTeam);
    if (answer == true) {
        keepGoing = false;
        return;
    } else {
        keepGoing = true;
        return;
    }
}

// Main build function
async function initBuild() {
    let manager = await inquirer.prompt(initPrompt);
    addEmployee(manager);
    while (keepGoing === true) {
        console.log("\033[39m", "Here is your current team:");
        console.log(team);
        await handleRedirect();
    }
    // console.log(team);
    return team;
}

module.exports = initBuild;
