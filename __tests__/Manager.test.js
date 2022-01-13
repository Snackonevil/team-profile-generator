const Manager = require("../lib/Manager");

test("Testing Manager class properties and methods", () => {
    const kevin = new Manager("Kevin", 1, "lacsonky@gmail.com", 34);

    expect(kevin.name).toBe("Kevin");
    expect(kevin.id).toBe(1);
    expect(kevin.email).toBe("lacsonky@gmail.com");
    expect(kevin.getName()).toMatch("Kevin");
    expect(kevin.getId()).toBe(1);
    expect(kevin.getEmail()).toMatch("lacsonky@gmail.com");
    expect(kevin.getOfficeNumber()).toEqual(34);
    expect(kevin.getRole()).toMatch("Manager");
});
