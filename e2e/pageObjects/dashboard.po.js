const NewApiLocators = require('../locators/newApi.locators');
const NewProductLocators = require('../locators/newApiCollection.locators');
const NewCreateApiDocsLocators = require('../locators/documentation.locators');
const NavigationLocators = require('../locators/navigation.locators');

class DashboardPO {
    constructor() {
        this.newApiLocators = NewApiLocators;
        this.newProductLocators = NewProductLocators;
        this.newCreateApiDocsLocators = NewCreateApiDocsLocators;
        this.navigationLocators = NavigationLocators;
    }
    
    get heading() {
        return element(by.css(this.navigationLocators.header.css));
    }

// PO for creating new API form
    get apiName(){
        return element.all(by.id(this.newApiLocators.apiName.id)).first();
    }

    get swaggerOption(){
        return element(by.id(this.newApiLocators.swaggerOption.id));
    }

    get description(){
        return element(by.id(this.newApiLocators.description.id));
    }

    get file(){
        return element(by.css(this.newApiLocators.file.css));
    }

    get save_button(){
        return element(by.css(this.newApiLocators.save.css));
    }

    get delete_button(){
        return element(by.css(this.newApiLocators.deleteApiButton.css));
    }

    get newApiHeading(){
        return element(by.css(this.newApiLocators.newApiHeading.css));
    }

//PO for creating new API collection - Products
    get productName(){
        return element.all(by.id(this.newProductLocators.productName.id)).first();
        // return element(by.id(this.newProductLocators.productName.id));
    }

    get productDescription(){
        return element(by.id(this.newProductLocators.productDescription.id));
    }

    get apis(){
        return element(by.css(this.newProductLocators.apis.css));
    }

    get newProductHeading(){
        return element(by.css(this.newProductLocators.newProductHeading.css));
    }

    get deleteProductButton(){
        return element(by.css(this.newProductLocators.deleteProductButton.css));
    }

//PO for creating new API documentation
    get createApiDocName(){
        return element(by.id(this.newCreateApiDocsLocators.createApiDocName.id));
    }

    get createApiDocDesc(){
        return element(by.id(this.newCreateApiDocsLocators.createApiDocDesc.id));
    }

    get newApiDocsHeading(){
        return element(by.css(this.newCreateApiDocsLocators.newApiDocsHeading.css));
    }

    get deleteApiDocsButton(){
        return element(by.css(this.newCreateApiDocsLocators.deleteApiDocumentationButton.css));
    }


}

module.exports = new DashboardPO();