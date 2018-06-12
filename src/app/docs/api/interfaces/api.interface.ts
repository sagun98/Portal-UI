export interface API {
    id? : string,
    version? : number,
    title? : string,
    name : string,
    description : string,
    overview ? : any,
    gettingStarted ?: any,
    reference ? : any,
    swagger? : string,
    file? : File,
    swaggerUrl? : string
}