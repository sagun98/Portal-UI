import { ApiManagementTool } from './api-management-tool.interface';

export interface ApigeeManagementTool extends ApiManagementTool {
    duration: number,
    org: string
}

export const DefaultApigeeManagementTool = <ApigeeManagementTool> {name : null, id : '', duration : -1, org : ''};