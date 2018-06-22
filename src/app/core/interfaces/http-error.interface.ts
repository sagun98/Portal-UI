import { HttpErrorResponse } from '@angular/common/http';
import { HTTP_ERROR_TYPES } from "../enums/http-error-types.enum";

export interface HttpErrorMessage {
    id? : number,
    title? : string,
    type? : HTTP_ERROR_TYPES,
    message? : string,
    response? : HttpErrorResponse
}