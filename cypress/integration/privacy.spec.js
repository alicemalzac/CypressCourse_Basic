
it('Testa a página da política de privavidade de forma independente', () => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
})