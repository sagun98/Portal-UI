import { ApigeeTargetServer } from './apigee-targetserver.interface';

export interface DevPortalTargetServer {
    name? : string;
    targetServerPath? : string;
    targetServer? : ApigeeTargetServer
}