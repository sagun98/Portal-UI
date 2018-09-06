import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin, of } from 'rxjs';

export enum FORUM_CATEGORIES {
    BLOGS = 'Announcements',
    GENERAL_SUPPORT = 'General API Questions and Support Forum',
    FEEDBACK = 'Feedback'
}

@Injectable({providedIn: 'root'})
export class NodeBBBlogsResolve implements Resolve<any> {

    constructor (private http : HttpClient) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<object> {
        return Observable.create((observer) => {
            this.http.get(`${environment.forumBase}/api/categories`).subscribe( (results:any) => {
                const blogCategory = results.categories.filter(category => { return category.name === FORUM_CATEGORIES.BLOGS; })[0] || {};
                const generalSupportCategory = results.categories.filter(category => { return category.name === FORUM_CATEGORIES.GENERAL_SUPPORT; })[0] || {};
                const feedbackCategory = results.categories.filter(category => { return category.name === FORUM_CATEGORIES.FEEDBACK; })[0] || {};

                let requests: Observable<Object>[] = [];

                const blogRequest = (blogCategory.slug) ? this.http.get(`${environment.forumBase}/api/category/${blogCategory.slug}`) : of(1) ;
                requests.push(blogRequest);
                
                const generalSupportRequest = (generalSupportCategory.slug) ? this.http.get(`${environment.forumBase}/api/category/${generalSupportCategory.slug}`) : of(2);
                requests.push(generalSupportRequest);

                const feedbackRequest = (feedbackCategory.slug) ? this.http.get(`${environment.forumBase}/api/category/${feedbackCategory.slug}`) : of(3);
                requests.push(feedbackRequest);

                if(requests.length)
                    forkJoin(requests)
                    .subscribe(
                        responses => {                    
                            observer.next({
                                blogs : responses[0],
                                generalSupport : responses[1],
                                feedback : responses[2],
                                supportCid : generalSupportCategory.cid,
                                announcementsCid : blogCategory.cid
                            });
                            observer.complete();
                        },
                        error => {
                            console.log("error: ", error);
                        }
                    )

                else {
                    observer.next({topics : []});
                    observer.complete();
                }
                
            },
            error => {
                observer.next({
                    topics : [],
                    feedback : {url : ''},
                    generalSupport : {url : ''},
                    blogs : {url : ''}
                });
                observer.complete();
            }
            );
        });
    }
}