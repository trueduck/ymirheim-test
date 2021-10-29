//TODO: Split for multiple testcases, ask why it logs me out.
//  There's no "Delete Account" function so i can't repeatedly test account creation, so I'll skip the test.
//  Email/Password change functionality can only be autotested with internal access, I assume, so I'll skip them too.

import pidor from '../fixtures/test_fixture.json'
describe('Astolfo Plushie Test 3: Revenge of the D', () =>{
    
    it('Logs in on Ymirheim ID and tests the fields', () =>{
        cy.visit('https://id.ymirheim.org/')
        
        cy.get('button').contains('Log In').click()
        cy.get('input[id="Username"]').clear().type(pidor.USERNAME)
        cy.get('input[id="Password"]').clear().type(pidor.PASSWORD)
        cy.get('button').contains('Log In').click()
        //cy.wait(5000)

        cy.get('a').contains('Profile').click()  //profile tab
            cy.get('input[id="Username"]')
                .should('be.visible')
                .should('have.attr','disabled')
            cy.get('input[id="Name"]')
                .should('be.visible')
                //.should('have.attr','maxlength', '32') Will fail. Does not fit spec of registration form.
        
        cy.get('a').contains('Email').click() //email tab
            cy.get('input[id="Email"]')
                .should('be.visible')
                .should('have.attr','disabled')
            cy.get('input[id="NewEmail"]')
                .should('be.visible')
        cy.get('a').contains('Password').click() //password tab
            cy.get('input[id="OldPassword"]').should('be.visible')
            cy.get('input[id="NewPassword"]').should('be.visible')
            cy.get('input[id="ConfirmPassword"]').should('be.visible')
        cy.get('a').contains('Profile').click() 
    })
    it('Sucks your dick and calls you gay.', () => { //Why does it log me out? I'd like to have multiple testcases thanks.
        cy.get('a').contains('Profile').click()

    })
})