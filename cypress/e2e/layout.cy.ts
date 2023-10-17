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

  it("renders NotFound page when user browses to unknown route", () => {
    cy.visit("/unknown-route");
    cy.get("[data-testid='not-found-page']").should("be.visible");
  });

  it("renders How it works page when user clicks on How it works link", () => {
    cy.visit("/");
    cy.get("[data-testid='how-it-works-link']").click();
    cy.get("[data-testid='how-it-works-page']").should("be.visible");
  });
});
