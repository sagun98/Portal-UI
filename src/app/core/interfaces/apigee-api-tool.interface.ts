import { ApiManagementTool } from './api-management-tool.interface';

export interface ApigeeApiTool extends ApiManagementTool {
   org: string
}

export const DefaultApigeeApiTool = <ApigeeApiTool> {name : null, id : '', org : ''};