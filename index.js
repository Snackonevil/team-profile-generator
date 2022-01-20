// This file is the app's entry point

// Import file system module
const fs = require("fs");
// Import main build function
const initBuild = require("./src/inquire");
// Import function that writes file
const generateMarkup = require("./src/generateMarkup");

// Writes markup to /dist/index.html, takes in output from generateMarkup()
function writeProfile(markUp) {
    console.log("Rendering Team Profile...");
    fs.writeFile("./dist/index.html", markUp, err =>
        err ? console.log(err) : console.log("Writing File...")
    );
}

// Main function for app
async function createProfile() {
    console.log("Team Profile Generator Started...");
    const team = await initBuild();
    const markUp = await generateMarkup(team);
    writeProfile(markUp);
}

// Initializes app
createProfile();
