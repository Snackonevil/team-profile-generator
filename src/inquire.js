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
        console.log(`***Employee with ID ${id} has been removed***`);
    } else {
        return (removeState = false);
    }
}

// Menu to add or remove employee
async function handleRedirect() {
    let { choice } = await inquirer.prompt(redirect);
    // answer === "Add Employee"
    //     ? (keepGoing = true)
    //     : answer === "Remove Employee"
    //     ? (removeState = true)
    //     : ((keepGoing = false), (finishBuild = true));

    switch (choice) {
        case "Add Employee":
            keepGoing = true;
            break;
        case "Remove Employee":
            removeState = true;
            keepGoing = true;
            break;
        case "Build Profile":
            keepGoing = false;
            finishBuild = true;
            break;
    }
    return choice;
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
    if (answer == true) {
        finishBuild = true;
        keepGoing = false;
        return;
    } else {
        finishBuild = false;
        keepGoing = true;
        handleRedirect();
        return;
    }
}

// Main build function
async function initBuild() {
    let manager = await inquirer.prompt(initPrompt);
    addEmployee(manager);
    let choice = await handleRedirect();
    if (choice == "Add Employee" || "Remove Employee") {
        while (finishBuild === false) {
            while (keepGoing === true) {
                if (removeState === true) {
                    await handleRemove();
                    removeState = false;
                } else {
                    await buildEmployee();
                }
                console.log("Here is your current team:");
                console.log(team);
                await handleRedirect();
            }
            // await confirmBuild();
        }
    }
    if (choice == "Build Profile") {
        await confirmBuild();
    }

    // if (manager) {
    //     while ((finishBuild = false)) {
    //         while ((keepGoing = true)) {
    //             if ((keepGoing = true)) {
    //                 let choice = await handleRedirect();
    //                 if ((choice = "Build Profile")) {
    //                     await confirmBuild();
    //                 }
    //                 switch (choice) {
    //                     case "Add Employee":
    //                         await buildEmployee();
    //                         break;
    //                     case "Remove Employee":
    //                         await handleRemove();
    //                         break;
    //                     case "Build Profile":
    //                     //  await confirmBuild();
    //                 }
    //             }
    //         }
    //     }
    // }

    return team;
}

module.exports = initBuild;
