describe('NewForm', () => {
    beforeEach(() => cy.visit('baseUrl":"http://localhost:5500/'))
    describe('filling and submitting', () => {
        it('can type and see the correct name', () => {
            cy.get('input[name=name]')
             .type('erik burdett')
             .should('have.value', 'erik burdett')

             cy.get('input[name=email]').type('erikburdett@gmail.com')

            cy.get('input[name=password]').type('password').click()
            cy.get('input:invalid').should('have.length', 6)
            cy.get('#password').then(($input) => {
              expect($input[0].validationMessage).to.eq('this field is required')})
            cy.get('[type=terms]').check()

            cy.get('button').submit().click()

})
    describe('Filling inputs and cancelling', () => {

        it('submit button disabled', () => {

    cy.get('button').submit().should('be.disabled')})
    })
})
}) 