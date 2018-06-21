export interface IPortalUser {
    id? : string,
    email?: string,
    username? : string,
    name? : string,
    firstName? : string,
    lastName? : string,
    roles? : UserRole[],
    token?: string
}

export class PortalUser {

    private user: IPortalUser

    constructor (user: IPortalUser) {
        this.user = user;
    }

    public get id () {
        return this.user.id;
    }

    public get token () {
        return this.user.token;
    }

    public get email () {
        return this.user.email;
    }

    public get roles () {
        return this.user.roles;
    }

    public get username () {
        return this.user.username;
    }

    public get fullName () {
        return this.user.firstName + ' ' + this.user.lastName;
    }

}

export interface UserRole {
    name?: string,
    id? : string
}