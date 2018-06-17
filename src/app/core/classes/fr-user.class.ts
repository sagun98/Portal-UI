import { FRUser } from './../interfaces/fr-user.interface';

export class PortalUser {

    constructor(user: FRUser) {
        this.userData = user;        
    }

    private userData: FRUser;

    get username () {
        return this.userData.username;
    }

    get firstName () {
        return this.userData.givenName[0];
    }

    get lastName () {
        return this.userData.sn[0];
    }

    get fullName () {
        return `${this.firstName} ${this.lastName}`;
    }

}