describe("Quiz Component", () => {
    beforeEach(() => {
     
      cy.visit('http://localhost:3001');
    });
  
    it("renders the Start Quiz button initially", () => {
      
      cy.contains("Start Quiz").should("exist");
    });
  
    it("can start the quiz and answer questions", () => {
      
      cy.contains("Start Quiz").click();
      
     
      cy.get('h2').should('not.contain', 'Start Quiz'); 
      
      cy.get('.btn').first().click();
  
      
      cy.get('.alert-secondary').should('exist');
  
      
      cy.get('.btn').eq(1).click();
  
      cy.contains("Quiz Completed").should("exist");
      cy.contains("Your score:").should("exist");
    });
  
    it("should allow the user to start a new quiz after completion", () => {
    
      cy.contains("Start Quiz").click();
  
      cy.get('.btn').first().click();
      cy.get('.btn').eq(1).click();
  
      cy.contains("Quiz Completed").should("exist");
      cy.contains("Take New Quiz").click();
  
      cy.contains("Start Quiz").should("exist");
    });
  });