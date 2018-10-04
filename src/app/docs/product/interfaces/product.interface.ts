import { ApiManagementTool } from '../../../core/interfaces/api-management-tool.interface';
import { PermissibleEntity } from '../../../core/interfaces/permissible.interface';

export interface Product extends PermissibleEntity{
    id ? : string,
    cid? : number,
    version? : number,
    name : string,
    slug : string,
    description : string,
    overview? : string,
    apis : string[],
    apiManagementTool? : ApiManagementTool
}