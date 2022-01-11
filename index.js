const { initBuild, team } = require("./src/inquire");
const generateMarkup = require("./src/buildProfile");

async function build() {
    await initBuild();
    await generateMarkup(team);
}

build();
