
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Lins')
    cy.get('#email').type('alice@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})

Cypress.Commands.add('fillMandatoryFields', () => {
    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Lins')
    cy.get('#email').type('alice@exemplo.com')
    cy.get('#open-text-area').type('Teste')
})