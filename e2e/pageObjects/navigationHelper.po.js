const NavigationLocators = require('../locators/navigation.locators.json');
const CreateNewApiLocators = require('../locators/newApi.locators.json');
const Documentation = require('../locators/documentation.locators.json');

class NavigationPO {
    constructor() {
        this.locators = NavigationLocators;
        this.newApiLocators = CreateNewApiLocators;
        this.documentationLocators =Documentation;
    }

    getHomePageHeadingNotLoggedIn(){
        return element(by.css(this.locators.homePageHeadingNotLoggedIn.css));
    }

    getNav(){
        return element(by.css(this.locators.nav.css));
    }

    // New/Existing Api
    getApiLink(){
        return this.getNav().element(by.partialLinkText(this.locators.api.navText));
    }

    getAddApi(){
        return element(by.css(this.locators.addApiButton.css));
    }

    getCreateNewApiHeading(){
        return element(by.css(this.newApiLocators.createApiHeading.css));
    }

    getEditApiButton(){
        return element(by.css(this.newApiLocators.editApiButton.css));
    }


// New/Existing Product

    getAddApiCollection(){
        return element(by.css(this.locators.addApiCollectionButton.css));
    }

    //New Existing Documentation
    getDocumentationPage(){
        return element(by.css(this.locators.documentationPage.css));
    }
    getCreateApiDocButton(){
        return element(by.css(this.documentationLocators.createApiDocButton.css));
    }

    getEditApiDocButton(){
        return element(by.css(this.documentationLocators.editApiDocumentationButton.css));
    }



    //Links Checks
    getHomePageLink(){
        return element(by.css(this.locators.homePageLink.css));
    }

    getGettingStartedLink(){
        return element(by.id(this.locators.gettingStarted.id));
    }

    getMainDocumentationLink(){
        return element(by.id(this.locators.mainDocumentation.id));
    }

    getSpinner(){
        return element(by.css(this.locators.spinner.css));
    }

    getSideNav(){
        return element(by.css(this.locators.sideNav.css));
    }

    getFlashMsg(){
        return element(by.css(this.documentationLocators.flashMsg.css));

    }
}


module.exports = new NavigationPO();