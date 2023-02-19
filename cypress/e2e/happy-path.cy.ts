describe("Happy Path", () => {
  // beforeAll create a testing group
  before(() => {
    cy.request("POST", "/api/trpc/group.create", {
      json: {
        name: "E2E Dummy Group",
        description: "For testing purposes only",
        admin: "E2E-Tester",
      },
    }).then((response) => {
      cy.writeFile(
        "cypress/fixtures/cy-testingGroupId",
        response.body.result.data.json.groupId
      );
    });
  });

  // afterAll delete testing group
  after(() => {
    cy.readFile("cypress/fixtures/cy-testingGroupId").then((testingGroupId) => {
      cy.request("POST", "/api/trpc/group.deleteById", {
        json: {
          groupId: testingGroupId,
          admin: "E2E-Tester",
        },
      });
    });
  });

  it("should use VoteUp as admin", () => {
    // Root
    cy.visit("/");
    cy.findByRole("heading", { name: /VoteUp/i });

    // Check my groups
    cy.findByLabelText(/User menu/i).click();
    cy.findByText(/My groups/i).click();

    cy.url().should("include", "/my-groups");
    cy.findByRole("heading", { name: /My groups/i });
    cy.findByText(/No groups yet/i);

    // create a new group
    cy.findByRole("link", { name: /VoteUp/i }).click();
    cy.findByRole("heading", { name: /VoteUp/i });

    cy.findByLabelText(/Name/i).type("E2E Testing Group");
    cy.findByLabelText(/description/i).type(
      "This group is used for testing purposes"
    );

    cy.findByRole("button", { name: /Create group/i }).click();

    // Group content
    cy.findByRole("heading", {
      name: new RegExp("E2E Testing Group", "i"),
      timeout: 20000,
    });
    cy.findByLabelText(/Copy link to clipboard/i).realClick();

    cy.url().then((url) => {
      this.groupUrl = url;
    });

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(this.groupUrl);
      });
    });

    cy.window().then((win) => {
      win.navigator.clipboard.writeText("").then(() => {}); // reset clipboard
    });

    // view my groups
    cy.findByLabelText(/User menu/i).click();
    cy.findByText(/My groups/i).click();

    cy.findByRole("heading", { name: /My groups/i });
    cy.findByRole("heading", { name: /E2E Testing Group/i });
    cy.findByRole("button", { name: /Copy URL/i }).click();

    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(this.groupUrl);
      });
    });

    cy.findByRole("link", { name: /Open/i }).click();
    cy.findByRole("heading", { name: /Create item/i });
    cy.findByRole("heading", { name: /E2E Testing Group/i });
    cy.go("back");

    // delete group again
    cy.findByRole("heading", { name: /My groups/i });
    cy.findByRole("button", { name: /Delete/i }).click();

    cy.findByText(/No groups yet/i);
  });
});
