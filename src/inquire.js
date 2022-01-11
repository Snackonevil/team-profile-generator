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
let keepGoing = true;
let finishBuild = false;
let removeState = false;

// function buildProfile() {
//     console.log("Building team profile...");
//     console.log(team);
//     console.log(team[0].getName());
//     console.log(team[0].getRole());
// }

// Instantiate class based on role and add to team
function addEmployee({ role, name, id, email, officeNumber, github, school }) {
    role === "Engineer"
        ? team.push(new Engineer(name, id, email, github))
        : role === "Intern"
        ? team.push(new Intern(name, id, email, school))
        : team.push(new Manager(name, id, email, officeNumber));
}

// Remove selected employee with id from team
async function handleRemove() {
    const { id, answer } = await inquirer.prompt(removeEmployee);
    if (answer === true) {
        team = team.filter(employee => employee.id !== id);
        console.log(`Employee with ID ${id} has been removed:`);
    } else {
        return (removeState = false);
    }
}

// Menu to add or remove employee
async function handleRedirect() {
    const { answer } = await inquirer.prompt(redirect);
    answer === "Add Employee" ? (keepGoing = true) : (removeState = true);
}

// Prompt user input to create employee
async function buildEmployee() {
    let employee = await inquirer.prompt(employeePrompt);
    addEmployee(employee);
}

// Confirmation to build profile
// or take to add/remove menu
async function confirmBuild() {
    console.log(team);
    const { answer } = await inquirer.prompt(finalizeTeam);
    return (finishBuild = answer);
}

// Prompt user to add another employee or build team
async function continueBuild() {
    const { answer } = await inquirer.prompt(confirm);
    return (keepGoing = answer);
}

// Start build with Manager class
async function initBuild() {
    let manager = await inquirer.prompt(initPrompt);
    addEmployee(manager);
    await continueBuild();
    while (finishBuild === false) {
        while (keepGoing === true) {
            await buildEmployee();
            await continueBuild();
        }
        if (removeState === true) {
            await handleRemove();
        }
        await confirmBuild();
        if (finishBuild === false) {
            await handleRedirect();
        }
    }
}

module.exports = { team, initBuild };
