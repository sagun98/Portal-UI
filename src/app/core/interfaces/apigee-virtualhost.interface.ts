import { ApigeeSSLInfo } from "./apigee-sslinfo.interface";

export interface ApigeeVirtualHost {
    hostAliases? : string[];
	interfaces? : string[];
	listenOptions? : string[];
	name? : string;
	port? : number;
	properties? : any;
	sSLInfo? : ApigeeSSLInfo;
}