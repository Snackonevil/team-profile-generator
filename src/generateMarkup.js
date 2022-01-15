const header = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./bootstrap_Lux.css" />
        <title>Team Profile</title>
    </head>
    <body>
        <header class="container bg-primary p-5">
            <h1 class="text-light text-center">TEAM PROFILE</h1>
        </header>
        <div class="container">
            <div class="row justify-content-center">`;

const footer = `
        </div>
</body>
</html>`;

function generateCards(team) {
    let output = "";
    team.forEach(employee => {
        let extraInfo = "";
        let extraMethod;
        switch (employee.getRole()) {
            case "Manager":
                extraInfo = "Office Number";
                extraMethod = employee.getOfficeNumber();
                break;
            case "Engineer":
                extraInfo = "Github";
                extraMethod = employee.getGithub();
                break;
            case "Intern":
                extraInfo = "School";
                extraMethod = employee.getSchool();
                break;
        }

        output += `
                        <div class="card col-4 border-primary m-3">
        <div class="card-header text-center h1 p-3">${employee.getRole()}</div>
        <div class="card-body">
            <h4 class="card-title">Name: ${employee.getName()}</h4>
            <h4 class="card-title">Id: ${employee.getId()}</h4>
            <h4 class="card-title">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></h4>
            <h4 class="card-title">${extraInfo}: ${extraMethod}</h4>
        </div>
    </div>`;
    });
    return output;
}

async function generateMarkup(team) {
    console.log("Generating Markup...");
    const body = await generateCards(team);

    return header + body + footer;
}

module.exports = generateMarkup;
