// This file has the question content for the prompts

// Import inquirer module
const inquirer = require("inquirer");

// Integer validation
function validateInteger(input) {
    const valid = !isNaN(parseInt(input));
    return valid ? true : "Please enter an integer";
}

// Email format vaildation
// Found on StackOverflow.com Can be bypassed with email like "d@d.com"
function validateEmail(email) {
    if (
        String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        return true;
    } else {
        return "Please enter valid email address";
    }
}

// Initial prompt to build manager
const initPrompt = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the team's manager?",
    },
    {
        type: "input",
        name: "id",
        message: "Manager's employee Id#:",
        validate: input => validateInteger(input),
    },
    {
        type: "input",
        name: "email",
        message: "Manager's email:",
        validate: email => validateEmail(email),
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Manager's office number:",
        validate: input => validateInteger(input),
    },
];

// Prompt to build employee
const employeePrompt = [
    {
        type: "list",
        name: "role",
        message: "What role will this employee have?",
        choices: [
            new inquirer.Separator(),
            "Engineer",
            new inquirer.Separator(),
            "Intern",
            new inquirer.Separator(),
        ],
    },
    {
        type: "input",
        name: "name",
        message: employee => `${employee.role}'s name:`,
    },
    {
        type: "input",
        name: "id",
        message: employee => `${employee.role}'s employee ID#:`,
        validate: input => validateInteger(input),
    },
    {
        type: "input",
        name: "email",
        message: employee => `${employee.role}'s Email:`,
        validate: email => validateEmail(email),
    },
    {
        type: "input",
        name: "github",
        message: "Engineer's github username:",
        when: ({ role }) => role === "Engineer",
    },
    {
        type: "input",
        name: "school",
        message: "Intern's school:",
        when: ({ role }) => role === "Intern",
    },
];

// Prompt to confirm finalization
const finalizeTeam = [
    {
        type: "confirm",
        name: "answer",
        message:
            "Here is your team, would you like to build your team's profile?",
    },
];

// Essentially the main menu prompt
const redirect = [
    {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            new inquirer.Separator(),
            "Remove Employee",
            new inquirer.Separator(),
            "Build Profile",
        ],
    },
];

// Prompt to garther employee ID to remove from team
const removeEmployee = [
    {
        type: "input",
        name: "id",
        message: "Enter the Id of the employee you wish to remove",
    },
    {
        type: "confirm",
        name: "answer",
        message: id => `You entered Employee Id ${id.id}. Ok to remove?`,
    },
];

module.exports = {
    initPrompt,
    employeePrompt,
    finalizeTeam,
    redirect,
    removeEmployee,
};
