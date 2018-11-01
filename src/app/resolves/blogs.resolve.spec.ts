import { Observable } from 'rxjs/Observable';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import {NodeBBBlogsResolve, FORUM_CATEGORIES} from './blogs.resolve';
import { NodeBBCategoryService } from '../domain/nodebb/category/nodebb-category.service';
import { NodeBBCategoriesResponse } from '../domain/nodebb/category/nodebb-categories.interface';
import { NodeBBCategory } from '../domain/nodebb/category/nodebb-category.interface';
import { of } from 'node_modules/rxjs';

const blogCategoryMock: NodeBBCategory = {
  "cid" : 1,
  "description" : "Blog Category",
  "name" : FORUM_CATEGORIES.BLOGS,
  "slug" : "blogs",
  "title" : "Blog Category"
};

const generalSupportCategoryMock: NodeBBCategory = {
  "cid" : 2,
  "description" : "General Support",
  "name" : FORUM_CATEGORIES.GENERAL_SUPPORT,
  "slug" : "general-support",
  "title" : "General Support"
};

const feedbackCategoryMock: NodeBBCategory = {
  "cid" : 3,
  "description" : "Feedback",
  "name" : FORUM_CATEGORIES.FEEDBACK,
  "slug" : "feedback",
  "title" : "Feedback"
};

const categories: NodeBBCategoriesResponse = {
  "url" : "/categories",
  "categories" : [blogCategoryMock, generalSupportCategoryMock, feedbackCategoryMock]
}

export class NodeBBCategoryServiceMock extends NodeBBCategoryService {
  constructor (protected http: HttpClient) {
    super(http);
  }

  public getAllCategories () : Observable<NodeBBCategoriesResponse> {
    return of(categories);
  }

  public getCategoryBySlug (slug: string) : Observable<NodeBBCategory> {
    return of(feedbackCategoryMock);
  }
}

describe('NodeBBBlogsResolve', () => {
  let service;
      
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers : [
        HttpClient,
        {provide : NodeBBCategoryService, useClass : NodeBBCategoryServiceMock, deps : [HttpClient]},
        NodeBBBlogsResolve
      ]
    });

  });
    
  it('should run #resolve()', inject([NodeBBBlogsResolve], (resolve: NodeBBBlogsResolve, http: HttpClient) => {
    resolve.resolve(null, null).subscribe( (t:any) => {
      expect(t.announcementsCid).toEqual(1);
      expect(t.supportCid).toEqual(2);
      expect(t.blogs.cid).toEqual(3);
      expect(t.feedback.cid).toEqual(3);
      expect(t.generalSupport.cid).toEqual(3);
    });
  }));
});
