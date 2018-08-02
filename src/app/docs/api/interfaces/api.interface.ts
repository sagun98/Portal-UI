import { PermissibleEntity } from "../../../core/interfaces/permissible.interface";

export interface API extends PermissibleEntity{
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
}