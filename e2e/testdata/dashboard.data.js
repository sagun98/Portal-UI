var path = require('path');

class Dashboard {
    constructor() {
        //Dummy API value for the new PRODUCT (Needs to be changed based on existing apis)
        this.apis = 'Longman Dictionary';

        //Headings
        this.headingNotLoggedIn = 'Learn How To Build With Pearson Products';
        this.heading = 'Welcome to the Pearson Developer Portal';


        //Details of New Api to be created
        this.apiName = 'Test API_123';
        this.description = 'Test API_123 description';
        this.file = path.resolve(__dirname, "./Employee.json");

        //Details of Api to be UPDATES
        this.updatedApiName = ' Updated';
        this.updatedDescription = ' Updated';

        //Details of New Product to be created
        this.productName= 'Test Product123';
        this.productDescription= 'Test Product Description123';

        //Details of New Api Documentation to be created
        this.apiDocName= 'Test New Api Documentation 123';
        this.apiDocDescription= 'Test New Api Documentation Description 123';

        //Details of New Api Documentation to be created
        this.updatedApiDocName= ' Updated';
        this.updatedApiDocDescription= ' Updated';
    }
}

module.exports = new Dashboard();