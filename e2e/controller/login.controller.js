const LoginPage = require("../pageObjects/login.po");
const EC = protractor.ExpectedConditions;
const Configurations = require("../common.conf.json");
const LoginTD = require("../testdata/common/users.data.js");
const NavigationPO = require("../pageObjects/navigationHelper.po");
const LoadingPO = require("../pageObjects/loader.po");


class Login {
    constructor() {
        this._page = LoginPage;
    }
    
    login() {
        browser.get(browser.baseUrl);
        browser.wait(EC.visibilityOf(NavigationPO.getHomePageHeadingNotLoggedIn()));
        browser.wait(EC.invisibilityOf(LoadingPO.loadingOverlay));

        this._page.loginBtn.click();
        
        this._page.username.sendKeys(LoginTD.user1.username);
        this._page.password.sendKeys(LoginTD.user1.password);
        this._page.loginSubmitBtn.click();
    }

    loginProd() {
        browser.get(browser.baseUrl);
        browser.wait(EC.visibilityOf(NavigationPO.getHomePageHeadingNotLoggedIn()));
        browser.wait(EC.invisibilityOf(LoadingPO.loadingOverlay))

        this._page.loginBtn.click();

        this._page.username.sendKeys(LoginTD.user2.username);
        this._page.password.sendKeys(LoginTD.user2.password);
        this._page.loginSubmitBtn.click();
    }
}

module.exports = new Login();
