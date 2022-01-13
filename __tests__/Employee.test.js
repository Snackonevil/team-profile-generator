const Employee = require("../lib/Employee");

test("Testing Employee class properties and methods", () => {
    const kevin = new Employee("Kevin", 1, "lacsonky@gmail.com");

    expect(kevin.name).toMatch("Kevin");
    expect(kevin.id).toBe(1);
    expect(kevin.email).toMatch("lacsonky@gmail.com");
    expect(kevin.getName()).toMatch("Kevin");
    expect(kevin.getId()).toBe(1);
    expect(kevin.getEmail()).toMatch("lacsonky@gmail.com");
    expect(kevin.getRole()).toMatch("Employee");
});
