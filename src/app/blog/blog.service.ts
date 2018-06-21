import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogPost } from './interfaces/blog-post.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http : HttpClient
  ) { }

  public getBlog (blogId : string) {
    return <Observable<BlogPost>> this.http.get(`http://localhost:3080/api/blog/${blogId}`);
  }

  public getBlogs (_params) {
    let params = new HttpParams();

    Object.keys( _params ).forEach(_key => {
      const value = _params[_key];
      let key = `${_key}_like`;
      params = params.append(key, value);
    });

    return <Observable<BlogPost[]>> this.http.get(`http://localhost:3080/api/blog`, { params });
  }

  public saveBlogPost (blogPost : BlogPost) : Observable<BlogPost> {
    return <Observable<BlogPost>> this.http.post(`http://localhost:3080/api/blog`, blogPost);
  }

  public updateBlogPost (blogPost : BlogPost) {
    return <Observable<BlogPost>> this.http.put(`http://localhost:3080/api/blog/${blogPost.id}`, blogPost);
  }
}