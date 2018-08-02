export interface PermissibleEntity {
    userPrivileges : Privilege[],
    [propName: string] : any;
}

export interface Privilege {
    username : string,
    permissions : string[]
}