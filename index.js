const fs = require("fs");
const initBuild = require("./src/inquire");
const generateMarkup = require("./src/generateMarkup");

function writeProfile(markUp) {
    fs.writeFile("./dist/index.html", markUp, err =>
        err ? console.log(err) : "Creating profile page..."
    );
}

async function createProfile() {
    const team = await initBuild();
    const markUp = await generateMarkup(team);
    writeProfile(markUp);
    console.log(markUp);
}

createProfile();
