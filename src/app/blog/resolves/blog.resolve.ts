import { BlogService } from './../blog.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export class BlogResolve implements Resolve<any> {

    constructor (
        private blogService : BlogService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const blogId = route.params.blogId || '';

        return this.blogService.getBlog(blogId);
    }
}