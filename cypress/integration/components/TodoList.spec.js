/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('TodoList', () => {
  before(() => {
    cy.visit('https://tantien-todo-app.surge.sh');
    const APP_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tantien-todo-app.surge.sh';
    cy.visit(APP_URL);
  });

  it('should have "What\'s the Plan for Today?" title at home page', () => {
  it.only('should have "What\'s the Plan for Today?" title at home page', () => {
    cy.get('h1').contains("What's the Plan for Today?");
  });

  it('should add a new todo and show it at the top of the list', () => {
  it.only('should add a new todo and show it at the top of the list', () => {
    cy.get('input.todo-input').type('Test todo');
    cy.get('button.todo-button').click();
  });

  it('should delete a todo from a list', () => {
    cy.get('.todo-row > div:first-child')
      .contains('Test todo')
      .get('.todo-row > div:first-child + .icons > .delete-icon')
  it.only('should update a todo', () =>{
    cy
    .contains('Test todo')
    .siblings('.icons').children('.edit-icon')
    .click({timeout: 2000});

    cy
    .get('input.todo-input.edit')
    .should('have.value', 'Test todo')
    .clear()
    .type('Updated todo');

    cy.get('button.todo-button.edit').click();
  });

  it.only('should delete a todo from a list', () => {
    cy
      .contains('Updated todo')
      .siblings('.icons').children('.delete-icon')
      .click();
  });


});