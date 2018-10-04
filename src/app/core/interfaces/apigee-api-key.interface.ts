export interface ApigeeApiKey {
    consumerKey : string,
    consumerSecret : string,
    status : string
    apiProducts : ApigeeApiKeyProduct[]
}

export interface ApigeeApiKeyProduct {
    apiproduct
    status
}