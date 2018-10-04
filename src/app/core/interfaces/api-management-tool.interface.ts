import { API_MANAGEMENT_TOOLS } from '../enums/api-management-tools.enum';

export interface ApiManagementTool {
    name: string,
    id : string,
    [key: string]: any;
}

export const DefaultApiManagementTool = <ApiManagementTool> {
    name : null,
    id : ''
}