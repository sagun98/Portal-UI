import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin, of } from 'rxjs';

enum FORUM_CATEGORIES {
    BLOGS = 'Blogs',
    GENERAL_SUPPORT = 'General API Questions and Support Forum'
}

@Injectable({providedIn: 'root'})
export class NodeBBBlogsResolve implements Resolve<any> {

    constructor (private http : HttpClient) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return Observable.create((observer) => {
            this.http.get(`${environment.forumBase}/api/categories`).subscribe( (results:any) => {
                const blogCategory = results.categories.filter(category => { return category.name === FORUM_CATEGORIES.BLOGS; })[0] || {};
                const generalSupportCategory = results.categories.filter(category => { return category.name === FORUM_CATEGORIES.GENERAL_SUPPORT; })[0] || {};
                let requests: Observable<Object>[] = [];

                const blogRequest = (blogCategory.slug) ? this.http.get(`${environment.forumBase}/api/category/${blogCategory.slug}`) : of(1) ;
                requests.push(blogRequest);
                
                const generalSupportRequest = (generalSupportCategory.slug) ? this.http.get(`${environment.forumBase}/api/category/${generalSupportCategory.slug}`) : of(2);
                requests.push(generalSupportRequest);

                if(requests.length)
                    forkJoin(requests).subscribe(responses => {                    
                        observer.next({
                            blogs : responses[0],
                            generalSupport : responses[1]
                        });
                        observer.complete();
                    });

                else {
                    observer.next({topics : []});
                    observer.complete();
                }
                
            });
        });
    }
}