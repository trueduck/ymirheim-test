//TODO: Скроллящиеся скриншоты, стрелка вниз, проверить наличие бокового меню и хайлайты текущего положения?



describe('Astolfo Plushie Test', () => {

        it('Header buttons scroll down to contents on click.', () => {
       
        cy.visit('https://ymirheim.org/ru')

        cy.get('a[href="#who-we-are"]').within(() =>
                cy.contains('Кто мы такие?').click()
            )
        cy.get('h2.wow-nomobile.fadeInDown').contains('Кто мы такие?').should('be.visible')

        cy.get('a[href="#what-do-we-do"]').within(() => 
                cy.contains('Что мы делаем?').click()
            )
        cy.get('h2.wow-nomobile.fadeInDown').contains('Что мы делаем?').should('be.visible')

        cy.get('a[href="#why-gotw"]').within(() =>
                cy.contains('Почему именно RO2:GotW?').click()
            )
        cy.get('h2.wow-nomobile.fadeInDown').contains('Почему именно RO2:GotW?').should('be.visible')

        cy.get('a[href="#when"]').within(() =>
                cy.contains('Так когда же?').click()
            )
        cy.get('h2.wow-nomobile.fadeInDown').contains('Так когда же?').should('be.visible')


    })
    
    it('Displays an inline with an ymirheim trailer',() =>{
        cy.get('iframe[src="https://www.youtube.com/embed/fT-8OhzKEas"]').scrollIntoView().should('be.visible')
        
    })

    it('Displays the screenshot carousel',() =>{            //Work in progress
        cy.get('div[id="screen-shots"]').should('be.visible')
            .within(() =>{
                //cy.get('img[src="/files/images/screenshots/tn/screenshot_01_tn.jpg?v1"]').should('be.visible') //autoscroll test
                cy.get('img[src="/files/images/screenshots/screenshot_04_tn.jpg?v1"]').should('be.visible')
                cy.get('img[src="/files/images/screenshots/screenshot_08_tn.jpg?v1"]').should('be.visible')
                cy.wait('1000')
                cy.get('img[src="/files/images/screenshots/screenshot_01_tn.jpg?v1"]').should('not.be.visible')
                cy.get('img[src="/files/images/screenshots/screenshot_05_tn.jpg?v1"]').should('be.visible')
                

            })
        
    })

    it('Switches you to correct site language on click', () => {

        cy.get('[class="language-switcher"]').get('[title="Русский"]').click()
        cy.url().should('include','/ru')

        cy.get('[class="language-switcher"]').get('[title="English"]').click()
        cy.url().should('include','/en')

    })

    it('Opens new tabs with social media buttons',() => {
        cy.visit('https://ymirheim.org/ru')

        cy.get('[class="col-md-6"]').within(() =>{
            cy.contains('Форум')
                .should('have.attr', 'href', 'https://ymirheim.org/forum/')
                .should('have.attr', 'target', '_blank')
        })

        cy.get('[class="col-md-6"]').within(() =>{
            cy.contains('Discord')
                .should('have.attr', 'href', 'https://discord.gg/eA3nMe47fH')
                .should('have.attr', 'target', '_blank')
        
        })



        cy.get('[class="social"]').within(() =>{
            cy.get('a[data-original-title="YouTube"]')
                .should('have.attr', 'href', 'https://www.youtube.com/channel/UCow3BZbz6LI_yE8Ku10VdBQ/')
                .should('have.attr', 'target', '_blank')

        
        })

        cy.get('[class="social"]').within(() =>{
            cy.get('a[data-original-title="VK"]')
                .should('have.attr', 'href', 'https://vk.com/ymirheim')
                .should('have.attr', 'target', '_blank')

        
        })

        cy.get('[class="social"]').within(() =>{
            cy.get('a[data-original-title="Twitter"]')
                .should('have.attr', 'href', 'https://twitter.com/YmirheimRu')
                .should('have.attr', 'target', '_blank')

        
        })

        cy.get('[class="social"]').within(() =>{
            cy.get('a[data-original-title="Facebook"]')
                .should('have.attr', 'href', 'https://facebook.com/Ymirheim')
                .should('have.attr', 'target', '_blank')

        
        })   

        cy.get('[class="social"]').within(() =>{
            cy.get('a[data-original-title="RSS"]')
                .should('have.attr', 'data-original-title', 'RSS')
                .should('have.attr', 'href', 'https://feeds.feedburner.com/Ymirheim')
                .should('have.attr', 'target', '_blank')
            
        })
    })


    it('Sucks your dick and calls you gay', () =>{
        //cy.visit('https://imgur.com/a/EHkmIL2')
        expect(true).to.equal(true)
    })



})
      
