import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PageableResponse } from './interfaces/pagable-response.interface';
import { BlogPost } from './interfaces/blog-post.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  constructor(
    private http : HttpClient
  ) { }

  public getBlogPost (blogId : string) {
    return <Observable<BlogPost>> this.http.get(`${environment.restBase}/blogs/${blogId}`);
  }

  public deleteBlogPost(blogId : string) {
    return <Observable<BlogPost>> this.http.delete(`${environment.restBase}/blogs/${blogId}`);
  }

  public getDocumentationLandingPage () {
    const params = new HttpParams()
                        .append('category', 'Documentation')
                        .append('subCategory', 'Documentation Landing Page');

    return <Observable<BlogPost>> this.http.get(`${environment.restBase}/blogs`, {params}).pipe(
      map( (blogs: PageableResponse) => {
        return (blogs.content && blogs.content.length) ? <BlogPost> blogs.content[0] : {}
      })
    );
  }

  public getAllDocumentation (_params) {
    let params = new HttpParams();

    Object.keys( _params ).forEach(_key => {
      const value = _params[_key];
      let key = `${_key}`;
      params = params.append(key, value);
    });

    return <Observable<BlogPost[]>> this.http.get(`${environment.restBase}/blogs?size=100`, { params }).pipe(
      map( (response : PageableResponse) => {
        return response.content
      })
    );
  }

  public saveBlogPost (blogPost : BlogPost) : Observable<BlogPost> {
    return <Observable<BlogPost>> this.http.post(`${environment.restBase}/blogs`, blogPost);
  }

  public updateBlogPost (blogPost : BlogPost) {
    return <Observable<BlogPost>> this.http.put(`${environment.restBase}/blogs/${blogPost.id}`, blogPost);
  }
}
