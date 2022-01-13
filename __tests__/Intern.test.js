const Intern = require("../lib/Intern");

test("Testing Intern class properties and methods", () => {
    const kevin = new Intern("Kevin", 1, "lacsonky@gmail.com", "GT-Bootcamp");

    expect(kevin.name).toMatch("Kevin");
    expect(kevin.id).toBe(1);
    expect(kevin.email).toMatch("lacsonky@gmail.com");
    expect(kevin.getName()).toMatch("Kevin");
    expect(kevin.getId()).toBe(1);
    expect(kevin.getEmail()).toMatch("lacsonky@gmail.com");
    expect(kevin.getSchool()).toMatch("GT-Bootcamp");
    expect(kevin.getRole()).toMatch("Intern");
});
