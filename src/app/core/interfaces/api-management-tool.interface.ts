import { API_MANAGEMENT_TOOLS } from './../enums/api-management-tools.enum';

export interface ApiManagementTool {
    name: API_MANAGEMENT_TOOLS,
    id : string
}

export const DefaultApiManagementTool = <ApiManagementTool> {
    name : null,
    id : ''
}