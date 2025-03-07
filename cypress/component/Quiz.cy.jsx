
import Quiz from '../../client/src/components/Quiz';

describe("Quiz Component", () => {
  beforeEach(() => {
    cy.mount(<Quiz />);
  });

  it("renders the Start Quiz button initially", () => {
    cy.contains("Start Quiz").should("exist");
  });

  it("starts the quiz when the Start Quiz button is clicked", () => {
    cy.contains("Start Quiz").click();
    cy.get(".spinner-border").should("exist"); // Checks for loading state
  });

  it("displays a question after loading", () => {
    cy.intercept("GET", "/api/questions", { fixture: "questions.json" }).as("getQuestions");
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
    cy.get("h2").should("exist"); // Checks that a question is displayed
  });

  it("allows selecting an answer", () => {
    cy.intercept("GET", "/api/questions", { fixture: "questions.json" }).as("getQuestions");
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
    cy.get("button").contains("1").click(); // Simulates clicking the first answer
  });

  it("shows the final score after all questions", () => {
    cy.intercept("GET", "/api/questions", { fixture: "questions.json" }).as("getQuestions");
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");

    for (let i = 0; i < 10; i++) {
      cy.get("button").contains("1").click(); // Simulates answering each question
    }

    cy.contains("Quiz Completed").should("exist");
    cy.contains("Your score:").should("exist");
  });

  it("allows restarting the quiz", () => {
    cy.contains("Start Quiz").click();
    cy.contains("Take New Quiz").click();
    cy.contains("Start Quiz").should("exist");
  });
});