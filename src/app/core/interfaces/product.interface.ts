import { PermissibleEntity, Privilege } from "./permissible.interface";
import { API } from "./api.interface";
import { ApiManagementTool } from "./api-management-tool.interface";

export interface Product extends PermissibleEntity{
    id ? : string,
    cid? : number,
    version? : number,
    name : string,
    slug : string,
    description : string,
    overview? : string,
    apis : API[],
    apiManagementTool? : ApiManagementTool,
    apiUserPrivileges : Privilege[]
}