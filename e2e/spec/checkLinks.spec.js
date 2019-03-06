
const DashboardController = require("../controller/dashboard.controller");
const NavigationPO = require("../pageObjects/navigationHelper.po");
const EC = protractor.ExpectedConditions;
const Configuration = require("../common.conf.json");


describe('Check Links', () => {

    it('Verify Login',()=> {
        browser.wait(EC.visibilityOf(NavigationPO.getApiLink()),Configuration.timeOut);
    });

    it('Check Home Page Link',()=> {
        DashboardController.navToHomePage();
    });

    it('Check Getting Started Page Link',()=> {
        NavigationPO.getGettingStartedLink().click();
        DashboardController.verifyHeading();
    });

    // it('Check Main Documentation Page Link Landing Page',()=> {
    //     DashboardController.navToHomePage();
    //     NavigationPO.getMainDocumentationLink().click();
    //     DashboardController.verifyDocumentationHeading();
    // });

});