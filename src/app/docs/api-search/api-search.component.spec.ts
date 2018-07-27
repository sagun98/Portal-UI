import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSearchComponent } from './api-search.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchService } from './search.service';
import { of } from 'rxjs/observable/of';

export const SearchResultsTest = [
  {itemId : 1234, title : 'test 1', description : 'testing 1234'},
  {itemId : 1235, title : 'test 2', description : 'testing 4321'},
  {itemId : 1236, title : 'test 3', description : 'testing 7890'}
];

export class SearchServiceMock extends SearchService{
  constructor (private _http : HttpClient) {
    super(_http);
  }

  public search (phrase : string) {
    return of(SearchResultsTest)
  }
}

describe('ApiSearchComponent', () => {
  let component: ApiSearchComponent;
  let fixture: ComponentFixture<ApiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers : [
        // HttpClient,
        {provide : SearchService, useClass : SearchServiceMock, deps : [HttpClient]}
      ],
      declarations: [ ApiSearchComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.finishedSearch).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    expect(component).toBeTruthy();
  });

  it('should have created a form', () => {
    expect(  component.form.controls.hasOwnProperty('keywords') ).toBeTruthy();
  });

  it('form should be initially invlaid', () => {
    expect (component.form.invalid).toBeTruthy();
  });

  it('form should be valid after setting keyword', () => {
    component.form.get('keywords').setValue('portal');
    expect( component.form.invalid ).toBeFalsy
  });

  it('should return search results', () => {
    component.searchApis();

    fixture.detectChanges();

    expect(component.finishedSearch).toBeTruthy();
    expect(component.ApiResults.length).toEqual(3)
  });
});
