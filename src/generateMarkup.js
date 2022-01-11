function generateMarkup(team) {
    let output = "";
    team.forEach(employee => {
        output += `${employee.getRole()} ${employee.getName()} ${employee.getId()}`;
    });
    return output;
}

module.exports = generateMarkup;
