// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "**/projects/", "fixture:project.json");
    cy.route("GET", "**/employee/", "fixture:employee.json");
  });
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("a", "Project Dashboard");
    cy.contains("h3", "Project List");
    cy.contains("h3", "Employee List");
  });
});
