export interface BrowserMessage<T> {
    origin? : string,
    data? : MessagePayload<T>
}

export interface MessagePayload<T> {
    payload : T
}

export interface SwaggerEditorLoaded {
    loaded : boolean
}

export interface SwaggerEditorYAML {
    openAPI : string
}