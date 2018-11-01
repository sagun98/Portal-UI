import { Privilege } from '../interfaces/permissible.interface';
import { ENTITY_PERMISSIONS } from '../enums/user-permissions.enum';

export class UserPrivilegeClass {
    
    public username : string = '';

    public collaborateOnly: boolean = false;

    public permissions : string[] = [];

    public email: string = '';

    public privilegeMap : any = {
        ADMIN : false,
        MODIFY : false
    };

    public uniquePrivilege: string =  '';
    
    constructor (userPrivilege : Privilege) {
        this.setPrivilegeMap(userPrivilege);
        this.username = userPrivilege.username;
        this.permissions = userPrivilege.permissions || [];
        this.collaborateOnly = userPrivilege.collaborateOnly || this.collaborateOnly;
        this.email = userPrivilege.email;
        this.setUniquePrivilege();
    }

    private setPrivilegeMap (userPrivilege: Privilege ) {
        Object.keys(ENTITY_PERMISSIONS).forEach(key => {
            if (userPrivilege.permissions && userPrivilege.permissions.length && userPrivilege.permissions.indexOf(key) >= 0 )
                this.privilegeMap[key] = true;
            else
                this.privilegeMap[key] = false;
        });
    }

    public setUniquePrivilege () : void {
        this.uniquePrivilege = this.permissions[0];
    }

    public updatePermissions (prop: string)  {
        Object.keys( this.privilegeMap ).forEach(k => {
            if(this.privilegeMap[k] && (k === prop) && (this.permissions.indexOf(k) === -1)  )
                this.permissions.push(k);
            else if(! this.privilegeMap[k] && (k === prop) && (this.permissions.indexOf(k) >= 0) ) {
                const i = this.permissions.indexOf(k);
                this.permissions.splice(i, 1);
            }
        });
    }
}