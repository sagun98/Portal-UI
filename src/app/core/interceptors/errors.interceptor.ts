import { HttpErrorsService } from './../services/http-errors/http-errors.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessage } from './../interfaces/http-error.interface';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HTTP_ERROR_TYPES } from '../enums/http-error-types.enum';
import { isArray } from 'util';

@Injectable({providedIn : 'root'})
export class ErrorInterceptor implements HttpInterceptor {


    constructor (
        private httpErrorsServices : HttpErrorsService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return <any> next.handle(request).pipe(catchError( (errorResponse : HttpErrorResponse) => {
            
            const errorMessages: HttpErrorMessage[] = [];

            if( isArray( errorResponse.error ) )
                errorResponse.error.forEach( error =>  {
                    const errorMessage: HttpErrorMessage = {
                        id: new Date().getTime(),
                        type : error.type || HTTP_ERROR_TYPES.ERROR,
                        title : errorResponse.error.title || '',
                        message : error.message
                    };

                    errorMessages.push(errorMessage);
                });

            else
                errorMessages.push(
                    <HttpErrorMessage> {
                        id: new Date().getTime(),
                        type : errorResponse.error.type || HTTP_ERROR_TYPES.ERROR,
                        title : errorResponse.error.title || '',
                        message : errorResponse.error.message
                    }
                );
            
            this.httpErrorsServices.$onError.next(errorMessages);
                
            throw errorResponse;
        }));
    }
}

export const ErrorInterceptorInterceptor = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true
}