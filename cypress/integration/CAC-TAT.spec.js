/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
  })
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste'

    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Alice')
    cy.get('#email').type('alice@alice.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Alice')
    cy.get('#email').type('alice@alice,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  
  })

  it('Campo telefone continua vazio quando preenchido com valor não númerico', () => {

    cy.get('#phone')
      .type('Alice')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário ', () => {

    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Alice')
    cy.get('#email').type('alice@alice.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Alice')
      .should('have.value', 'Alice')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName')
      .type('Alice')
      .should('have.value', 'Alice')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('alice@alice.com')
      .should('have.value', 'alice@alice.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('12345678')
      .should('have.value', '12345678')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('Seleciona o produto YouTube por seu texto', () => {
    cy.fillMandatoryFields()
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Seleciona o produto Mentoria por seu texto', () => {
    cy.fillMandatoryFields()
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Seleciona o produto Blog por seu texto', () => {
    cy.fillMandatoryFields()
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.fillMandatoryFields()
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) =>{
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should('not.be.checked')
      
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    
    cy.get('#firstName').type('Alice')
    cy.get('#lastName').type('Lins')
    cy.get('#email').type('alice@exemplo.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
      
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json') //adicionou o arquivo no input
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json') //navegou entre as propriedades do objeto para verificar se o arquivo que entrou foi o enviado
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //adicionou o arquivo no input arrastando o arquivo 
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json') //navegou entre as propriedades do objeto para verificar se o arquivo que entrou foi o enviado
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    
    cy.fixture('example').as('sampleFile')

    cy.get('input[type="file"]')
      .selectFile('@sampleFile') //adicionou o arquivo no input arrastando o arquivo 
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example') //navegou entre as propriedades do objeto para verificar se o arquivo que entrou foi o enviado
      })
  })
  
  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

    cy.get('#privacy a') //seleciona o âncora que ta dentro do elemento com id privacy
      .should('have.attr', 'target', '_blank') //tem o atributo target com valor blank 
  }) 

  it('Acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
    
    cy.get('#privacy a')
      .invoke('removeAttr', 'target') 
      .click()
    
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
  })
})
