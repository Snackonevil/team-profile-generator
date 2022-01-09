const inquirer = require("inquirer");

// async function stringValidation(input) {
//     input.typeOf() !== "string" ? false : true;
// }

const initPrompt = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the team's manager?",
    },
    {
        type: "number",
        name: "id",
        message: "Manager's employee Id#:",
        // validate: answer => {
        //     if (isNaN(answer.id)) {
        //         return "please enter an integer";
        //     } else {
        //         return true;
        //     }
        // },
    },
    {
        type: "input",
        name: "email",
        message: "Manager's email:",
    },
    {
        type: "number",
        name: "officeNumber",
        message: "Manager's office number:",
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
    },
    {
        type: "input",
        name: "email",
        message: employee => `${employee.role}'s Email:`,
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
