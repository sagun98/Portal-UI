export interface PermissibleEntity {
    userPrivileges : Privilege[],
    [propName: string] : any;
}

export interface Privilege {
    username : string,
    email: string,
    permissions : string[],
    [propName: string] : any;
}