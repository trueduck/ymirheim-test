//TODO:
//  Creation/Deletion of the forum topic can be tested, but doing it on live will probably inconvenience people.
//  Especially on a slow forum that some people may have on e-mail notifications for new posts. (If there is one, lol.)
import pidor from '../fixtures/test_fixture.json'


describe('Astolfo Plushie Test 2: Electric Boogaloo', () => {
    //const LONG_STRING = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891' //101 symbol
    //const SHORT_STRING = '0'   Look, Mom! I used fixtures instead! Am I winning yet?

    it('Checks Language Scrollers',() => {
        cy.visit('https://forum.ymirheim.org/')
   
        cy.get('[class="language-cat-switch"]').within(() =>{
            cy.get('a[title="International forums"]').click()
            
            })
            cy.contains('Category').should('be.visible')

        cy.get('[class="language-cat-switch"]').within(() =>{
            cy.get('a[title="Русские разделы"]').click()

            })
            cy.contains('Russian').should('be.visible')

    })      
    
    it('Clicks header buttons to check their functionality', () => {
        cy.get('a[title="Main Page"]')
            .should('have.attr', 'href', 'https://ymirheim.org/')

        cy.get('a[title="Ymirheim Wiki"]')
            .should('have.attr', 'href', 'https://wiki.ymirheim.org/')

        cy.get('a[title="Ymirheim ID"]')
            .should('have.attr', 'href', 'https://id.ymirheim.org/')

        cy.get('a[id="search-button"]')
            .should('have.attr', 'href', '/search')
            .click()
                cy.get('input[id="search-term"]').should('be.visible')

        cy.get('a[id="toggle-hamburger-menu"]').click()
            cy.get('div[class="menu-panel slide-in"]').should('be.visible').within(() =>{
                cy.contains('Latest').should('be.visible')
                cy.contains('Top').should('be.visible')
                cy.contains('Badges').should('be.visible')
                cy.contains('Tags').should('be.visible')
            })
                      
    })
    

    it('Opens "Register a new account." form and tests the fields for exceptions.', () =>{
        cy.fixture('test_fixture')
        cy.visit('https://forum.ymirheim.org/')
        cy.get('button').contains('Log In').click()
        cy.contains('Register as a new user?').click()
            cy.url().should('include','register')
       
        cy.get('input[id="Username"]')
        cy.get('input[id="Name"]')
        cy.get('input[id="Email"]')
        cy.get('input[id="Password"]')
        cy.get('input[id="ConfirmPassword"]')
        
        cy.get('button').contains('Register').click()
            cy.contains('The Username field is required.').should('be.visible')
            cy.contains('The Display name field is required.').should('be.visible')
            cy.contains('The Email field is required.').should('be.visible')
            cy.contains('The Password field is required.').should('be.visible')

        cy.get('input[id="Username"]').clear().type(pidor.SHORT_STRING)
        cy.get('input[id="Name"]').clear().type(pidor.SHORT_STRING)
        cy.get('input[id="Email"]').clear().type(pidor.SHORT_STRING)
        cy.get('input[id="Password"]').clear().type(pidor.SHORT_STRING)
        cy.get('input[id="ConfirmPassword"]').clear().type(pidor.SHORT_STRING)
            cy.get('button').contains('Register').click()
                cy.contains('Only alphanumeric characters or underscore allowed.').should('be.visible')  
                cy.contains('The Display name must be at least 3 and at max 32 characters long.').should('be.visible')  
                cy.contains('The Email field is not a valid e-mail address.').should('be.visible')  
                cy.contains('The Password must be at least 6 characters long.').should('be.visible')
        
        cy.get('input[id="Username"]')
            .should('have.attr', 'maxlength', '16')        
            .clear().type(pidor.LONG_STRING)
        cy.get('input[id="Name"]')
            .should('have.attr', 'maxlength', '32')        
            .clear().type(pidor.LONG_STRING)
        cy.get('input[id="Email"]')
            //.should('have.attr', 'maxlength', '16')  Can't find any length interval restrictions in the code. Would be in spec.     
            .clear().type(pidor.LONG_STRING)
        cy.get('input[id="Password"]')
            .should('have.attr', 'maxlength', '100')        
            .clear().type(pidor.LONG_STRING)
        cy.get('input[id="ConfirmPassword"]')
            //.should('have.attr', 'maxlength', '100') no restiction for input, like with password. There should be. I'd write a report?        
            .clear().type('pidor_rus')
            cy.get('button').contains('Register') //.click()
            cy.contains('The Email field is not a valid e-mail address.').should('be.visible') //find out how to work with the fact that I can't physically enter too many symbols.
            cy.contains('The password and confirmation password do not match.').should('be.visible') //for now I process it as maxlength checks. 
    })

    it('Clics "Log In" and checks exceptions for login fields', () => {
        cy.visit('https://forum.ymirheim.org/')
        //cy.config('chromeWebSecurity: false') doesn't work, says it should on cypress.json help page
        cy.get('button').contains('Log In').click()
        
        cy.get('input[id="Username"]').type(pidor.SHORT_STRING)
        cy.get('input[id="Password"]').type(pidor.SHORT_STRING)
        cy.get('button').contains('Log In').click()
            cy.contains('Invalid username or password').should('be.visible')
        
        cy.get('input[id="Username"]').type(pidor.LONG_STRING)
        cy.get('input[id="Password"]').type(pidor.LONG_STRING)
        cy.get('button').contains('Log In').click()
            cy.contains('Invalid username or password').should('be.visible')

    }) 

    it('Clicks "Log In" button and logs into account.', () => {
        cy.visit('https://forum.ymirheim.org/')
        
        cy.get('button').contains('Log In').click()
        cy.get('input[id="Username"]').clear().type(pidor.USERNAME)
        cy.get('input[id="Password"]').clear().type(pidor.PASSWORD)
        cy.get('button').contains('Log In').click()

    })

    it('Logs out of the account', () => {
        //cy.visit('https://forum.ymirheim.org/')
        cy.get('img[alt="profile, messages, bookmarks and preferences"]').click()
        cy.get('button[title="Preferences"]',).click({force: true}) //Без force:true происходит что-то немножко странное. Превью выполняет логаут со скоростью звука,
        cy.contains('Log Out').click({force: true}) // ...а автотест-лог потом охуевает с того, что окно, появляющееся по хронологии после самого клика, закрывает кнопки от этого же клика. Не понимаю почему так.
        //cy.wait(5000)
        //cy.contains('Refresh').click({force: true}) //Causes site error "Forbidden" maybe because autotest tries to access other parts of site code after logging out?
        cy.visit('https://forum.ymirheim.org/')


    })

   
    it('Celebrates your gayness and sucks some dick.', () =>{
        expect(true).to.equal(true)
    })

})