// Write tests here!

describe('User-Onboarding', () => {
    //***** Get to the website *****

    //What is it doing
    it('navigate to http://localhost:3000', () => {
        //going to website
        cy.visit('http://localhost:3000')
        //assuring i'm in the right place
        cy.url().should('includes', 'localhost')
    })
    // ***** Enter Name Into #name
    it('Input name into name field', () => {
        //callign #name
        cy.get('input[name="name"]')
            // typing pogchamp
            .type('pogChamp')
            // assertation to check if I got my input
            .should('have.value', 'pogChamp')
    })
    it('Input email into email field', () => {
        //callign email
        cy.get('input[name="email"]')
            // typing email
            .type('pogChamp@gmail.com')
            // assertation to check if I got my input
            .should('have.value', 'pogChamp@gmail.com')
    })
    it('Input password into password field', () => {
        //callign name
        cy.get('input[name="password"]')
            // typing pw
            .type('prettyPoggersPassword')
            // assertation to check if I got my input
            .should('have.value', 'prettyPoggersPassword')
    })
    it('Check the Checkbox', () => {
        cy.get('[type="checkbox"]').check() 
    })
    it('Submit Button is inabled', () => {
            cy.get('#submit').click()
        })
})