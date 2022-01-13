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
        console.log("Here is your team:");
        console.log(team);
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
        case "Finish Building My Team":
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
    return answer === true ? (finishBuild = true) : (finishBuild = false);
}

// Prompt user to add another employee or build team
async function continueBuild() {
    const { answer } = await inquirer.prompt(confirm);
    return (keepGoing = answer);
}

// Main build function
async function initBuild() {
    let manager = await inquirer.prompt(initPrompt);
    addEmployee(manager);
    // let choice = await handleRedirect();
    // if ((choice = "Add Employee" || "Remove Employee")) {
    //     while (finishBuild === false) {
    //         while (keepGoing === true) {
    //             if (removeState === true) {
    //                 await handleRemove();
    //                 removeState = false;
    //             } else {
    //                 await buildEmployee();
    //             }
    //             await handleRedirect();
    //         }
    //         confirmBuild();
    //     }
    // } else {
    //     if ((choice = "Finish Building My Team")) {
    //         await confirmBuild();
    //     }
    // }

    do {
        do {
            let choice = await handleRedirect();
            switch (choice) {
                case "Add Employee":
                    await buildEmployee();
                    break;
                case "Remove Employee":
                    await handleRemove();
                    break;
                case "Finish Building My Team":
                    console.log("what");
                    break;
            }
        } while ((keepGoing = true));
        await confirmBuild();
    } while ((finishBuild = false));

    return team;
}

module.exports = initBuild;
