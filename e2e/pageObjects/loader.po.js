const LoadingLocator = require('../locators/loading.locators.json');

class LoadingPO {
    constructor() {
        this.locators = LoadingLocator;
    }
    
   get loadingOverlay () {
    return element(by.id(this.locators.loader.id));
   }
    
}

module.exports = new LoadingPO();