const Engineer = require("../lib/Engineer");

test("Testing Engineer class properties and methods", () => {
    const kevin = new Engineer("Kevin", 1, "lacsonky@gmail.com", "Snackonevil");

    expect(kevin.name).toMatch("Kevin");
    expect(kevin.id).toBe(1);
    expect(kevin.email).toMatch("lacsonky@gmail.com");
    expect(kevin.getName()).toMatch("Kevin");
    expect(kevin.getId()).toBe(1);
    expect(kevin.getEmail()).toMatch("lacsonky@gmail.com");
    expect(kevin.getGithub()).toMatch("Snackonevil");
    expect(kevin.getRole()).toMatch("Engineer");
});
