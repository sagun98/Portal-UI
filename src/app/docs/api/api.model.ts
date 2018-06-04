export interface DevPortalAPI {
    readonly id : number,
    title : string,
    overview ? : any,
    gettingStarted ?: any,
    reference ? : any,
    swagger ? : string
}