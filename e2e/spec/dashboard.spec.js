
const DashboardController = require("../controller/dashboard.controller");
const NavigationPO = require("../pageObjects/navigationHelper.po");
const EC = protractor.ExpectedConditions;
const Configuration = require("../common.conf.json");
const LoadingPO = require("../pageObjects/loader.po");


describe('Successfully logged in', () => {
   it('Verify Heading', ()=> {
       DashboardController.verifyHeading();
   });
});

describe('Create new Api', () => {

    it('Go to APIs',()=> {
        NavigationPO.getApiLink().click();
    });


    it('Wait for APIs page loading',()=> {
        browser.wait(EC.visibilityOf(NavigationPO.getAddApi()),Configuration.timeOut);
    });

    it('Go to create new API',()=> {
        NavigationPO.getAddApi().click();
    });


    it('Filled New Api form',()=> {
        DashboardController.fillNewApiForm();
    });

    it('Saved New Api form filled',()=> {
        DashboardController.saveNewApiForm();
    });


});


describe('Edit existing Api', () => {

    it('Go to edit API',()=> {
        NavigationPO.getEditApiButton().click();
    });

    it('Filled New Api form',()=> {
        DashboardController.fillEditApiForm();
    });

    it('Saved Updated Api form filled',()=> {
        DashboardController.saveUpdatedApiForm();
    });

});

describe('Delete an existing Api', () => {

    it('Go to edit API',()=> {
        NavigationPO.getEditApiButton().click();
        browser.sleep(2000);
    });

    it('Delete Api',()=> {
        DashboardController.deleteApi();
    });

});


describe('Create new Api Collection(Product)', () => {
    it('Go to APIs',()=> {
        browser.wait(EC.invisibilityOf(LoadingPO.loadingOverlay),Configuration.timeOut);
        NavigationPO.getApiLink().click();
    });


    it('Wait for APIs page loading',()=> {
        browser.wait(EC.visibilityOf(NavigationPO.getAddApi()),Configuration.timeOut);
    });

    it('Go to create new API Collection',()=> {
        NavigationPO.getAddApiCollection().click();
    });


    it('Filled New Api Collection form',()=> {
        DashboardController.fillProductForm();
    });

    it('Saved New Product filled form ',()=> {
        DashboardController.saveProductForm();
    });

});

describe('Update existing Api Collection(Product)', () => {

    it('Go to edit API Collection',()=> {
        NavigationPO.getEditApiButton().click();
    });

    it('Update Api Collection form',()=> {
        DashboardController.updateProductForm();
    });

    it('Saved New Product filled form ',()=> {
        DashboardController.saveUpdatedProductForm();
    });

});

describe('Delete an existing Product', () => {

    it('Go to edit API',()=> {
        browser.sleep(.5);
        NavigationPO.getEditApiButton().click();
        browser.sleep(2000);
    });

    it('Delete Product',()=> {
        DashboardController.deleteProduct();
    });

});


describe('Create new Documentation', () => {

    it('Go to Documentation Page',()=> {
        NavigationPO.getDocumentationPage().click();
    });


    it('Wait for Documentation page loading',()=> {
        browser.wait(EC.visibilityOf(NavigationPO.getCreateApiDocButton()),Configuration.timeOut);
    });

    it('Go to create new API documentation',()=> {
        NavigationPO.getCreateApiDocButton().click();
    });


    it('Filled New Api Documentation form',()=> {
        DashboardController.fillNewApiDocsForm();
    });

    it('Saved New Api form filled',()=> {
        DashboardController.saveNewApiDocsForm();
        NavigationPO.getFlashMsg().click();
    });

});

describe('Edit existing Api Documentation', () => {

    it('Wait for Documentation page loading',()=> {
        browser.wait(EC.visibilityOf(NavigationPO.getCreateApiDocButton()),Configuration.timeOut);
    });

    it('Go to edit API Documentation',()=> {
        browser.wait(EC.invisibilityOf(LoadingPO.toastr),Configuration.timeOut);
        browser.wait(EC.invisibilityOf(LoadingPO.loadingOverlay),Configuration.timeOut);

        NavigationPO.getEditApiDocButton().click();
    });

    it('Update Api documentation form',()=> {
        DashboardController.updateDocsForm();
    });

    it('Saved Updated Api Documentation form filled',()=> {
        DashboardController.saveUpdatedDocsForm();
        NavigationPO.getFlashMsg().click();
    });

});

describe('Delete an existing Documentation', () => {

    it('Go to edit API Documentation',()=> {
        browser.wait(EC.invisibilityOf(LoadingPO.toastr),Configuration.timeOut);
        browser.wait(EC.invisibilityOf(LoadingPO.loadingOverlay),Configuration.timeOut);

        NavigationPO.getEditApiDocButton().click();
        browser.sleep(2000);
    });

    it('Delete Api Documentation',()=> {
        browser.wait(EC.invisibilityOf(LoadingPO.toastr),Configuration.timeOut);
        browser.wait(EC.invisibilityOf(LoadingPO.loadingOverlay),Configuration.timeOut);
        
        DashboardController.deleteApiDocumentation();
    });

});
