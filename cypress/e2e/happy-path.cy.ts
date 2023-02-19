describe("Happy Path", () => {
  it("passes", () => {
    cy.visit("/");

    cy.findByRole("heading", { name: /VoteUp/i });
  });
});
