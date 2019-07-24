import { DevPortalTargetServer } from "./dev-portal-target-server.interface";
import { DevPortalProxyEndpoint } from "./dev-portal-proxy-endpoint.interface";

export interface DevPortalProxy {

    id? : string;
    name? : string;
    org? : string;
    environment? : string;
    targetServers? : DevPortalTargetServer[];
    basePaths? : DevPortalProxyEndpoint[];
}