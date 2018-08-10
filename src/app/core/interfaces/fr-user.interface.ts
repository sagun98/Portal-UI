export interface IPortalUser {
    id? : string,
    email?: string,
    username? : string,
    name? : string,
    firstName? : string,
    lastName? : string,
    roles? : UserRole[],
    token?: string,
}

export class PortalUser {

    private user: IPortalUser
  
    public roleMap: any = {};

    constructor (user: IPortalUser) {
        if(!user.roles)
            user.roles = [];
            
        user.roles.forEach(role => {
            this.roleMap[role.name] = true;
        });

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

    public set roles (roles : UserRole[]) {
        this.user.roles = roles;
    }

    public get username () {
        return this.user.username;
    }

    public get fullName () {
        return this.user.firstName + ' ' + this.user.lastName;
    }

    public hasRole(role : string) {
        return (this.user.roles.filter( (_role: UserRole) => { return _role.name === role}).length) ? true : false; 
    }

    public setRoelMap(roles : UserRole[]) {
        roles.forEach(role => {
            this.roleMap[role.name] = this.hasRole(role.name);
        });
    }

    public addRole (role : UserRole) {
        const exists = this.roles.filter(_role => { return _role.name === role.name }).length

        if(exists)
            return;

        this.user.roles.push(role);
    }

    public removeRole(roleName: string) {
        this.roles.forEach( (_role: UserRole, index : number) =>  {
            if(_role.name === roleName)
              this.roles.splice(index, 1);
        });
    }

}

export interface UserRole {
    name?: string,
    id? : string,
    privileges : UserPrivilege[]
}

export interface UserPrivilege {
    name? : string,
    authority? : string,
    id? : string
}