import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HTTP_INTERCEPTORS, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { UserService } from "../services/user/user.service";

@Injectable({providedIn : 'root'})
export class AuthTokenInterceptor implements HttpInterceptor{
    constructor ( private userService : UserService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.userService.authToken;

        const ignorePattern = /.*\/auth\/.*/;

        const tokenizedRequest = request.clone({
            headers: new HttpHeaders({
                'PearsonSSOSession': authToken
            })
        });
                
        if(ignorePattern.test(request.url))
            return <any> next.handle(request);
        else
            return <any> next.handle(tokenizedRequest);
    }
}

export const AuthTokenInterceptorProivder = {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthTokenInterceptor,
    multi : true
}