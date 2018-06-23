import { BlogService } from './../blog.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({providedIn : 'root'})
export class BlogsResolve implements Resolve<any> {

    constructor (
        private blogService : BlogService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const blogId = route.params.blogId || '';
        const type = route.data;

        return this.blogService.getBlogs(type);
    }
}