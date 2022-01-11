// const team = require("./inquire");
let output = "";

function generateMarkup(team) {
    team.forEach(employee => {
        output += `${employee.getRole()} ${employee.getName()} ${employee.getId()}`;
    });
    console.log(output);
}

module.exports = generateMarkup;
