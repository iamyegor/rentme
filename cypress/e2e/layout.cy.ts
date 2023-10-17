describe("Layout", () => {
  it("renders cars page when cars link is clicked", () => {
    cy.visit("/");
    cy.get("[data-testid='cars-link']").click();
    cy.get("[data-testid='cars-page']").should("be.visible");
  });

  it("renders home page when home link is clicked", () => {
    cy.visit("/");
    cy.get("[data-testid='home-link']").click();
    cy.get("[data-testid='home-page']").should("be.visible");
  });
});
