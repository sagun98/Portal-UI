import { ApiManagementTool } from './api-management-tool.interface';

export interface ApigeeApiTool extends ApiManagementTool {
   environment : string;
   org: string;
   revision: number;
}

export const DefaultApigeeApiTool = <ApigeeApiTool> {name : null, id : '', environment : '', org : ''};