const inquirer = require("inquirer");
const {
    initPrompt,
    employeePrompt,
    confirm,
    finalizeTeam,
    redirect,
} = require("./questions");

let employees = [];

function buildProfile() {
    console.log("Building team profile...");
}

function addEmployee(employee) {
    employees.push(employee);
}

async function handleRedirect() {
    const { answer } = await inquirer.prompt(redirect);
    answer == "Add Employee" ? buildEmployee() : console.log("delete?");
}

async function buildEmployee() {
    let employee = await inquirer.prompt(employeePrompt);
    addEmployee(employee);
    continueBuild();
}

async function confirmTeam() {
    console.log(employees);
    const { answer } = await inquirer.prompt(finalizeTeam);
    answer ? buildProfile() : handleRedirect();
}

async function continueBuild() {
    const { answer } = await inquirer.prompt(confirm);
    answer ? buildEmployee() : confirmTeam();
}

async function initBuild() {
    const manager = await inquirer.prompt(initPrompt);
    addEmployee({ role: "Manager", ...manager });
    continueBuild();
}

initBuild();
