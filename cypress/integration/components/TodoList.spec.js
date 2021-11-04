/// <reference types="cypress" />

describe('TodoList', () => {
  before(() => {
    cy.visit('https://tantien-todo-app.surge.sh');
  });

  it('should have "What\'s the Plan for Today?" title at home page', () => {
    cy.get('h1').contains("What's the Plan for Today?");
  });

  it('should add a new todo and show it at the top of the list', () => {
    cy.get('input.todo-input').type('Test todo');
    cy.get('button.todo-button').click();
  });

  it('should delete a todo from a list', () => {
    cy.get('.todo-row > div:first-child')
      .contains('Test todo')
      .get('.todo-row > div:first-child + .icons > .delete-icon')
      .click();
  });
});
