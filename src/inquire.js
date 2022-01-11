const inquirer = require("inquirer");
const {
    initPrompt,
    employeePrompt,
    confirm,
    finalizeTeam,
    redirect,
    removeEmployee,
} = require("./questions");
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

let team = [];

function buildProfile() {
    console.log("Building team profile...");
    console.log(team);
    console.log(team[0].getName());
    console.log(team[0].getRole());
}

// Instantiate class based on role and add to team
function addEmployee({ role, name, id, email, officeNumber, github, school }) {
    role === "Engineer"
        ? team.push(new Engineer(name, id, email, github))
        : role === "Intern"
        ? team.push(new Intern(name, id, email, school))
        : team.push(new Manager(name, id, email, officeNumber));
    continueBuild();
}

// Remove selected employee with id from team
async function handleRemove() {
    const { id, answer } = await inquirer.prompt(removeEmployee);
    if (answer === true) {
        team = team.filter(employee => employee.id !== id);
        console.log(`Employee with ID ${id} has been removed\n`);
        confirmTeam();
    } else {
        confirmTeam();
    }
}

// Menu to add or remove employee
async function handleRedirect() {
    const { answer } = await inquirer.prompt(redirect);
    answer === "Add Employee" ? buildEmployee() : handleRemove();
}

// Prompt user input to create employee
async function buildEmployee() {
    let employee = await inquirer.prompt(employeePrompt);
    addEmployee(employee);
}

// Confirmation to build profile
// or take to add/remove menu
async function confirmTeam() {
    console.log(team);
    const { answer } = await inquirer.prompt(finalizeTeam);
    answer ? buildProfile() : handleRedirect();
}

// Prompt user to add another employee or build team
async function continueBuild() {
    const { answer } = await inquirer.prompt(confirm);
    answer ? buildEmployee() : confirmTeam();
}

// Start build with Manager class
async function initBuild() {
    let manager = await inquirer.prompt(initPrompt);
    addEmployee(manager);
}

initBuild();

module.exports = team;
