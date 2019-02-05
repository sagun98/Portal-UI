const User = require('../../models/user.model');
class Users {
    constructor() {
        this._user1 = new User('c5test02', 'Password1');
        this._user2 = new User('UMAHAS1', '*******');
    }
    
    get user1() {
        return this._user1;
    }

    get user2() {
        return this._user2;
    }
}

module.exports = new Users();
