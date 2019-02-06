const LoadingLocator = require('../locators/loading.locators.json');

class LoadingPO {
    constructor() {
        this.locators = LoadingLocator;
    }
    
   get loadingOverlay () {
    return element(by.id(this.locators.loader.id));
   }

   get toastr () {
    return element(by.id(this.locators.toastr.css));
   }
    
}

module.exports = new LoadingPO();