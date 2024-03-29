import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Loading } from '@clr/angular';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoadingInterceptorService } from './loading-interceptor.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor (
        private loadingInterceptorService : LoadingInterceptorService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const requestId = new Date().getTime();

        this.loadingInterceptorService.addOpenRequest(requestId);

        return <any> next.handle(request).pipe(
            tap( (response: HttpResponse<any>) => {
                const status = response.status;
                const body = response.body;
                const statusText = response.statusText;

                if((body || statusText) && status){
                    this.loadingInterceptorService.closeOpenRequest(requestId)
                } 
            }),
            catchError( (errorResponse: any, caught: Observable<HttpResponse<any>>) => {
                const status = errorResponse.status;
                const body = errorResponse.error;

                if(status >= 0){
                    this.loadingInterceptorService.closeOpenRequest(requestId)
                } 
                
                return throwError(errorResponse);
                //throw errorResponse;
            })
        )
    }
}

export const LoadingInterceptorProvider = {
    provide  : HTTP_INTERCEPTORS,
    useClass : LoadingInterceptor,
    multi : true
}