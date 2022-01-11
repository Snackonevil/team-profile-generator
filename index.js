const { initBuild, team } = require("./src/inquire");
const generateMarkup = require("./src/generateMarkup");

async function createProfile() {
    await initBuild();
    const markUp = await generateMarkup(team);
    console.log(markUp);
}

createProfile();
