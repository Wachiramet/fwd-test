describe("Premium Calculator Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("fills out form and submits", () => {
    cy.get("input[name='firstName']").type("P");
    cy.get("input[name='lastName']").type("L");
    cy.get("select[name='genderCd']").select("Male");
    cy.get("input[name='dob']").type("1996-01-01");
    cy.get("select[name='planCode']").select("package 2 (T11A50)");
    cy.get("input[name='premiumPerYear']").clear().type("12000");
    cy.get("select[name='paymentFrequency']").select("Quarterly");

    cy.get("button").contains("Calculate").click();

    // Ensure Calculation Result is Displayed
    cy.get("h3").should("contain", "Calculation Result:");
  });
});
