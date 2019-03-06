const LoginLocators = require('../locators/login.locators.json');

class LoginPO {
    constructor() {
        this.locators = LoginLocators;
    }
    
    get loginBtn() {
        return element(by.id(this.locators.loginBtn.id));
    }
    
    get username() {
        return element(by.id(this.locators.username.id));
    }
    
    get password() {
        return element(by.id(this.locators.password.id));
    }
    
    get loginSubmitBtn() {
        return element(by.css(this.locators.login.css));
    }
    
}

module.exports = new LoginPO();