import { HttpClient, HttpHandler } from '@angular/common/http';
import { async } from '@angular/core/testing';
import {NodeBBCategoryService} from './nodebb-category.service';

class HttpClientMock extends HttpClient {
  constructor (
    protected _handler : HttpHandler
  ) {
    super(_handler);
  }
}

describe('NodeBBCategoryService', () => {
  let service;
  let httpClientMock: HttpClientMock;
      
  beforeEach(() => {
    httpClientMock = new HttpClientMock(null);
    service = new NodeBBCategoryService(httpClientMock);
  });

    
  it('should run #createCategory()', async(() => {
    // const result = createCategory(category, uid);
  }));
        
  it('should run #setModerator()', async(() => {
    // const result = setModerator(categoryId, privilegeRequest);
  }));
      
});
