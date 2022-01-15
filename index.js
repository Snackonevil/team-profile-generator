const fs = require("fs");
const initBuild = require("./src/inquire");
const generateMarkup = require("./src/generateMarkup");

// Writes markup to /dist/index.html
function writeProfile(markUp) {
    console.log("Rendering Team Profile...");
    fs.writeFile("./dist/index.html", markUp, err =>
        err ? console.log(err) : console.log("Writing File...")
    );
}

// Parent function for app
async function createProfile() {
    console.log("Team Profile Generator Started...");
    const team = await initBuild();
    const markUp = await generateMarkup(team);
    writeProfile(markUp);
}

createProfile();
