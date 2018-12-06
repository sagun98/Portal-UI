import { Documentation } from './../core/interfaces/documentation.interface';
import { DocumentationArea } from '../core/interfaces/documentation-area.interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PageableResponse } from './interfaces/pagable-response.interface';
import { BlogPost } from './interfaces/blog-post.interface';
import { Subject, BehaviorSubject } from 'rxjs';
import { Privilege } from '../core/interfaces/permissible.interface';
import { UserPrivilegeClass } from '../core/classes/user-privilege';
import { DOCUMENTATION_LANDING_PAGE_LABEL } from '../core/constants/documentation.constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  public documentationLandingPageArea: DocumentationArea;

  public $documentationLandingPageArea: BehaviorSubject<DocumentationArea> = new BehaviorSubject<DocumentationArea>({
    description : '',
    id : '',
    documents : [],
    name : '',
    slug : ''
  });

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

  public onChange: Subject<any> = new Subject<any>();

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

  public findAllDocumentationArea () : Observable<DocumentationArea[]> {
    return <Observable<DocumentationArea[]>> this.http.get(`${environment.restBase}/documentation-area`).pipe(
      tap( (documentationAreas: DocumentationArea[]) => {
        let hasLandingPage: boolean = false;
        documentationAreas.forEach(documentationArea => {
          if (documentationArea.name.toLocaleLowerCase() === DOCUMENTATION_LANDING_PAGE_LABEL) {
            this.documentationLandingPageArea = documentationArea;
            this.$documentationLandingPageArea.next(documentationArea);
            hasLandingPage = true;
          }
        });

        if (! hasLandingPage)
          this.$documentationLandingPageArea.next( <DocumentationArea> {
            description : '',
            id : '',
            documents : [],
            name : '',
            slug : ''
          });
      })
    );
  }

  public findDocumentationArea (id: string) : Observable<DocumentationArea> {
    return <Observable<DocumentationArea>> this.http.get(`${environment.restBase}/documentation-area/${id}`);
  }

  public createDocumentationArea (documentationArea: DocumentationArea) : Observable<DocumentationArea> {
    return <Observable<DocumentationArea>> this.http.post(`${environment.restBase}/documentation-area`, documentationArea).pipe(
      tap(t => {
        this.documentationLandingPageArea = null;
      })
    );
  }

  public udpateDocumentationArea (documentationArea: DocumentationArea) : Observable<DocumentationArea> {
    return <Observable<DocumentationArea>> this.http.put(`${environment.restBase}/documentation-area/${documentationArea.id}`, documentationArea);
  }

  public deleteDocumentationArea (documentationArea: DocumentationArea) {
    return this.http.delete(`${environment.restBase}/documentation-area/${documentationArea.id}`).pipe(
      tap(t => {
        this.documentationLandingPageArea = null;
      })
    );
  }

  public createDocumentation (documentationAreaId : string, documentation : Documentation) : Observable<Documentation> {
    return <Observable<Documentation>> this.http.post(`${environment.restBase}/documentation-area/${documentationAreaId}/documents`, documentation);
  }

  public findDocumentationById (documentationAreaId : string, documentationId : string) : Observable<Documentation> {
    return <Observable<Documentation>> this.http.get(`${environment.restBase}/documentation-area/${documentationAreaId}/documents/${documentationId}`);
  }

  public updateDocumentation (documentationAreaId : string, documentation : Documentation) : Observable<Documentation> {
    return <Observable<Documentation>> this.http.put(`${environment.restBase}/documentation-area/${documentationAreaId}/documents/${documentation.id}`, documentation);
  }

  public deleteDocumentation (documentationAreaId : string, documentationId: string) : Observable<any> {
    return this.http.delete(`${environment.restBase}/documentation-area/${documentationAreaId}/documents/${documentationId}`);
  }

  public getPrivileges (documentationAreaId: string, documentationId : string) {
    return this.http.get(`${environment.restBase}/documentation-area/${documentationAreaId}/documents/${documentationId}/privileges`).pipe(
      map((privileges: Privilege[]) => {
        return privileges.map(p => {
          return new UserPrivilegeClass(p);
        });
      })
    );
  }

  public setUserPrivileges (documentationAreaId: string, documentationId : string, privileges: UserPrivilegeClass[]) : Observable<Documentation> {
    return <Observable<Documentation>> this.http.put(`${environment.restBase}/documentation-area/${documentationAreaId}/documents/${documentationId}/privileges`, privileges)
  }
}
