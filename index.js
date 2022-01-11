const { initBuild, team } = require("./src/inquire");
const generateMarkup = require("./src/buildProfile");

async function build() {
    await initBuild();
    const markUp = await generateMarkup(team);
    console.log(markUp);
}

build();
