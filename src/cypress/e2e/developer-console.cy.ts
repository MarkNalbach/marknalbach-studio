/// <reference types="cypress" />

describe("Developer Console", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("runs the about command", () => {
      cy.get('input[placeholder*="Try"]')
        .clear()
        .type("about{enter}");
  
      cy.contains("Mark is positioned as a creative product engineer")
        .should("be.visible");
    });
  
    it("switches to Portfolio AI mode", () => {
      cy.contains("button", "Portfolio AI").click();
  
      cy.contains("Portfolio AI Assistant")
        .should("be.visible");
  
      cy.get('input[placeholder*="suggested question"]')
        .should("exist");
    });
  
    it("answers a Firebase question", () => {
      cy.contains("button", "Portfolio AI").click();
  
      cy.get('input[placeholder*="suggested question"]')
        .type("What did you build with Firebase?{enter}");
  
      cy.contains("Firebase is used across multiple mobile projects")
        .should("be.visible");
  
      cy.contains("US Brew Passport")
        .should("be.visible");
  
      cy.contains("Potty Pal")
        .should("be.visible");
    });
  });