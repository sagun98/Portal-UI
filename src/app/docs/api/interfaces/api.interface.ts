import { ApiManagementTool } from '../../../core/interfaces/api-management-tool.interface';
import { PermissibleEntity } from "../../../core/interfaces/permissible.interface";

export interface API extends PermissibleEntity{
    id? : string,
    cid? : number,
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
    apiManagementTool? : ApiManagementTool,
    followers? : string[]
}