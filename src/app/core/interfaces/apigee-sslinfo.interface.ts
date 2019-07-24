export interface ApigeeSSLInfo {
    ciphers? : string[];
	clientAuthEnable?: boolean;
	enabled? : boolean;
	ignoreValidationErrors? : boolean;
	keyAlias? : string;
	keyStore? : string;
	protocols? : string[];
}