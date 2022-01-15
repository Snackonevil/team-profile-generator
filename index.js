const fs = require("fs");
const initBuild = require("./src/inquire");
const generateMarkup = require("./src/generateMarkup");

function writeProfile(markUp) {
    console.log("Rendering Team Profile...");
    fs.writeFile("./dist/index.html", markUp, err => console.log(err));
}

async function createProfile() {
    const team = await initBuild();
    const markUp = await generateMarkup(team);
    writeProfile(markUp);
    // console.log(markUp);
}

createProfile();
