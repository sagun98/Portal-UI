import { Privilege } from './../interfaces/permissible.interface';

export class UserPrivilegeClass {
    
    public username : string = '';

    public permissions : string[] = [];

    public privilegeMap : any = {
        ADMIN : false,
        MODIFY : false
    };
    
    constructor (userPrivilege : Privilege) {
        this.setPrivilegeMap(userPrivilege);
        this.username = userPrivilege.username;
        this.permissions = userPrivilege.permissions;

    }

    private setPrivilegeMap (userPrivilege: Privilege ) {
        ["ADMIN", "MODIFY"].forEach(p => {
            if (userPrivilege.permissions.indexOf(p) >= 0 )
                this.privilegeMap[p] = true;
        });
    }

    public updatePermissions (prop: string)  {
        Object.keys( this.privilegeMap ).forEach(k => {
            if(this.privilegeMap[k] && (k === prop) && (this.permissions.indexOf(k) === -1)  )
                this.permissions.push(k);
            else if(! this.privilegeMap[k] && (k === prop) && (this.permissions.indexOf(k) >= 0) ) {
                const i = this.permissions.indexOf(k);
                this.permissions.splice(i, 1);
            }

            console.log(this.permissions);
        })
    }
}