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

function addEmployee({ role, id, name, email, officeNumber, github, school }) {
    if (role == "Engineer") {
        const engineer = new Engineer(id, name, email, github);
        team.push(engineer);
    } else if (role == "Intern") {
        const kevin = new Intern(id, name, email, school);
        team.push(kevin);
    } else {
        team.push(new Manager(id, name, email, officeNumber));
    }
    continueBuild();
}

async function handleRemove() {
    const { id, answer } = await inquirer.prompt(removeEmployee);
    if (answer == true) {
        team = team.filter(employee => employee.id !== id);
        console.log(`Employee with ID ${id} has been removed\n`);
        confirmTeam();
    } else {
        confirmTeam();
    }
}

async function handleRedirect() {
    const { answer } = await inquirer.prompt(redirect);
    answer == "Add Employee" ? buildEmployee() : handleRemove();
}

async function buildEmployee() {
    let employee = await inquirer.prompt(employeePrompt);
    addEmployee(employee);
}

async function confirmTeam() {
    console.log(team);
    const { answer } = await inquirer.prompt(finalizeTeam);
    answer ? buildProfile() : handleRedirect();
}

async function continueBuild() {
    const { answer } = await inquirer.prompt(confirm);
    answer ? buildEmployee() : confirmTeam();
}

async function initBuild() {
    let manager = await inquirer.prompt(initPrompt);
    addEmployee(manager);
}

initBuild();

module.exports = team;
