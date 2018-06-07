export interface DevPortalAPI {
    id? : number,
    revision? : number,
    title? : string,
    name : string,
    description : string,
    overview ? : any,
    gettingStarted ?: any,
    reference ? : any,
    swagger : string
}