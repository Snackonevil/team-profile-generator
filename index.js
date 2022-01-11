const initBuild = require("./src/inquire");
const generateMarkup = require("./src/generateMarkup");

async function createProfile() {
    const team = await initBuild();
    const markUp = await generateMarkup(team);
    console.log(markUp);
}

createProfile();
