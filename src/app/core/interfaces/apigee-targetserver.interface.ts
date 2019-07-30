import { ApigeeSSLInfo } from './apigee-sslinfo.interface';
export interface ApigeeTargetServer {
    host? : string;
	isEnabled? : boolean; 
	name? : string;
	port? : number;
	sSLInfo? : ApigeeSSLInfo
}