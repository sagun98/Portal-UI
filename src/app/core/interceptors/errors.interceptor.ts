import { HttpErrorsService } from '../services/http-errors/http-errors.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessage } from '../interfaces/http-error.interface';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable, Subject, of, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HTTP_ERROR_TYPES } from '../enums/http-error-types.enum';
import { isArray } from 'util';
import { environment } from '../../../environments/environment';

@Injectable({providedIn : 'root'})
export class ErrorInterceptor implements HttpInterceptor {
    constructor (
        private httpErrorsServices : HttpErrorsService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.indexOf(environment.forumBase) >= 0)
            return <any> next.handle(request);

        if(request.url.indexOf(location.hostname) == -1)
            return <any> next.handle(request);
        
        return <any> next.handle(request).pipe(catchError( (errorResponse : HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
            
            const errorMessages: HttpErrorMessage[] = [];

            if( isArray( errorResponse.error ) )
                errorResponse.error.forEach( error =>  {
                    const errorMessage: HttpErrorMessage = {
                        id: new Date().getTime(),
                        type : error.type || HTTP_ERROR_TYPES.ERROR,
                        title : errorResponse.error.title || '',
                        message : error.message,
                        response : errorResponse
                    };

                    errorMessages.push(errorMessage);
                });

            else if(errorResponse.error && errorResponse.error.message)
                errorMessages.push(
                    <HttpErrorMessage> {
                        id: new Date().getTime(),
                        type : errorResponse.error.type || HTTP_ERROR_TYPES.ERROR,
                        title : errorResponse.error.title || '',
                        message : (errorResponse.error && errorResponse.error.message) ? errorResponse.error.message : '',
                        response : errorResponse
                    }
                );
            
            else if(errorResponse.error && !errorResponse.error.message)
                errorMessages.push(
                    <HttpErrorMessage> {
                        id: new Date().getTime(),
                        type : errorResponse.error.type || HTTP_ERROR_TYPES.ERROR,
                        title : errorResponse.error.title || '',
                        message : errorResponse.message,
                        response : errorResponse
                    }
                );
            
            else if(! errorResponse.error)
                errorMessages.push(
                    <HttpErrorMessage> {
                        id: new Date().getTime(),
                        type : HTTP_ERROR_TYPES.ERROR,
                        title : (errorResponse.status === 401) ? "User Session Expired" : "Application Error",
                        message : errorResponse.message,
                        response : errorResponse
                    }
                );

            this.httpErrorsServices.$onError.next(errorMessages);

            // return throwError(caught);
            //throw errorResponse;
            return throwError(errorResponse);
        }));
    }
}

export const ErrorInterceptorInterceptor = {
    provide : HTTP_INTERCEPTORS,
    useClass : ErrorInterceptor,
    multi : true
}