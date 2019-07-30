import { ApigeeSSLInfo as IApigeeSSLInfo} from '../interfaces/apigee-sslinfo.interface';

export class ApigeeSSLInfo implements IApigeeSSLInfo{
    public ciphers : string[] = [];
	public clientAuthEnable: boolean = false;
	public enabled : boolean = true;
	public ignoreValidationErrors : boolean = false;
	public keyAlias : string;
	public keyStore : string;
    public protocols : string[] = [];

    constructor(apigeeSSLInfo : IApigeeSSLInfo) {
        Object.keys(apigeeSSLInfo).forEach(key => {
            this[key] = apigeeSSLInfo[key];
        });
    }
}