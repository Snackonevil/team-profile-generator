const inquirer = require("inquirer");

// async function stringValidation(input) {
//     input.typeOf() !== "string" ? false : true;
// }

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
        validate: function (value) {
            const valid = !isNaN(parseInt(value));
            return valid ? true : "Please enter an integer";
        },
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
        validate: function (value) {
            const valid = !isNaN(parseInt(value));
            return valid ? true : "Please enter an integer";
        },
    },
];

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
        type: "number",
        name: "id",
        message: employee => `${employee.role}'s employee ID#:`,
        validate: function (value) {
            const valid = !isNaN(parseInt(value));
            return valid ? true : "Please enter an integer";
        },
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
        message: "Engineer's github:",
        when: ({ role }) => role === "Engineer",
    },
    {
        type: "input",
        name: "school",
        message: "Intern's school:",
        when: ({ role }) => role === "Intern",
    },
];

const confirm = [
    {
        type: "confirm",
        name: "answer",
        message: "Would you like to add another employee?",
    },
];

const finalizeTeam = [
    {
        type: "confirm",
        name: "answer",
        message:
            "Here is your team, would you like to build your team's profile?",
    },
];

const redirect = [
    {
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            new inquirer.Separator(),
            "Remove Employee",
            new inquirer.Separator(),
        ],
    },
];

module.exports = {
    initPrompt,
    employeePrompt,
    confirm,
    finalizeTeam,
    redirect,
};
