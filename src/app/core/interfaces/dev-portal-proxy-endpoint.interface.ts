import { ApigeeTargetServer } from "./apigee-targetserver.interface";

export interface DevPortalProxyEndpoint {
    name? : string;
    path? : string;
    targetServer? : ApigeeTargetServer
}