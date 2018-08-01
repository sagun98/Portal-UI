export interface API {
    id? : string,
    version? : number,
    title? : string,
    name : string,
    slug? : string,
    description : string,
    overview ? : any,
    gettingStarted ?: any,
    reference ? : any,
    swagger? : string,
    file? : File,
    swaggerUrl? : string,
    tags? : string[],
    userPrivileges? : FineGrainedPrivilege[]
}

export interface FineGrainedPrivilege {
    id?: string,
    username?: string,
    permissions?: string[]
}