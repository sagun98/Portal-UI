const DashboardPage = require("../pageObjects/dashboard.po");
const EC = protractor.ExpectedConditions;
const Configurations = require("../common.conf.json");
const DashboardTD = require("../testdata/dashboard.data");
const NavigationPO = require("../pageObjects/navigationHelper.po");

class Dashboard {
    constructor() {
        this._page = DashboardPage;
        this._td = DashboardTD;
    }
    
    verifyHeading() {
        browser.wait(EC.visibilityOf(this._page.heading),Configurations.timeOut);
        expect(this._page.heading.getText()).toEqual(this._td.heading);
    }

// New API
    fillNewApiForm(){
        this._page.apiName.sendKeys(this._td.apiName);
        this._page.description.sendKeys(this._td.description);
        this._page.file.sendKeys(this._td.file);
    }

    fillEditApiForm(){
        this._page.apiName.sendKeys(this._td.updatedApiName);
        this._page.description.sendKeys(this._td.updatedDescription);
    }

    saveNewApiForm(){
        this._page.save_button.click();
        browser.wait(EC.visibilityOf(this._page.newApiHeading),Configurations.timeOut);
        expect(this._page.newApiHeading.getText()).toEqual(this._td.apiName);
    }

// Updated API
    saveUpdatedApiForm(){
        this._page.save_button.click();
        browser.wait(EC.visibilityOf(this._page.newApiHeading),Configurations.timeOut);
        expect(this._page.newApiHeading.getText()).toEqual(this._td.apiName+this._td.updatedApiName);
    }

    deleteApi(){
        this._page.delete_button.click();
        let ale = browser.switchTo().alert();
        ale.accept();
    }

// Product
    fillProductForm(){
        this._page.productName.sendKeys(this._td.productName);
        this._page.productDescription.sendKeys(this._td.productDescription);
        this._page.apis.sendKeys(this._td.apis);
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

// Updated Product
    updateProductForm(){
        this._page.productName.sendKeys(this._td.updatedApiName);
        this._page.productDescription.sendKeys(this._td.updatedDescription);
    }

    saveProductForm(){
        this._page.save_button.click();
        browser.wait(EC.visibilityOf(this._page.newProductHeading),Configurations.timeOut);
        expect(this._page.newProductHeading.getText()).toEqual(this._td.productName);
    }

    saveUpdatedProductForm(){
        this._page.save_button.click();
        browser.wait(EC.visibilityOf(this._page.newProductHeading),Configurations.timeOut);
        expect(this._page.newProductHeading.getText()).toEqual(this._td.productName+this._td.updatedApiName);
    }

    deleteProduct(){
        this._page.deleteProductButton.click();
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.alertIsPresent(), Configurations.timeOut, "Alert is not getting present");
        let ale = browser.switchTo().alert();
        ale.accept();
    }

// New API Documentation
    fillNewApiDocsForm(){
        this._page.createApiDocName.sendKeys(this._td.apiDocName);
        this._page.createApiDocDesc.sendKeys(this._td.apiDocDescription);
    }

    saveNewApiDocsForm(){
        this._page.save_button.click();
        browser.wait(EC.visibilityOf(this._page.newApiDocsHeading),Configurations.timeOut);
        expect(this._page.newApiDocsHeading.getText()).toEqual(this._td.apiDocName);
        browser.wait(EC.visibilityOf(NavigationPO.getEditApiButton()),Configurations.timeOut);
    }

// Updated API Documentaion
    updateDocsForm(){
        this._page.createApiDocName.sendKeys(this._td.updatedApiDocName);
        this._page.createApiDocDesc.sendKeys(this._td.updatedApiDocDescription);
    }

    saveUpdatedDocsForm(){
        this._page.save_button.click();
        browser.wait(EC.visibilityOf(this._page.newApiDocsHeading),Configurations.timeOut);
        expect(this._page.newApiDocsHeading.getText()).toEqual(this._td.apiDocName+this._td.updatedApiDocName);
    }

    deleteApiDocumentation(){
        browser.wait(EC.visibilityOf(this._page.deleteApiDocsButton),Configurations.timeOut);
        this._page.deleteApiDocsButton.click();
        browser.wait(EC.alertIsPresent(), Configurations.timeOut, "Alert is not getting present");
        let ale = browser.switchTo().alert();
        ale.accept();
    }

    navToHomePage(){
        NavigationPO.getHomePageLink().click();
        browser.wait(EC.visibilityOf(NavigationPO.getHomePageHeadingNotLoggedIn()),Configurations.timeOut);
        expect(NavigationPO.getHomePageHeadingNotLoggedIn().getText()).toEqual(this._td.headingNotLoggedIn);
    }

    verifyDocumentationHeading(){
        expect(this._page.heading.getText()).toEqual(this._td.heading);
    }

    pageLoading(){
            browser.wait(EC.visibilityOf(NavigationPO.getSpinner()), Configurations.timeOut);
            browser.wait(EC.invisibilityOf(NavigationPO.getSpinner()), Configurations.timeOut);
    }

}

module.exports = new Dashboard();
