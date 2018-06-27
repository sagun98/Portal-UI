import { BlogService } from './../blog.service';
import { dummyBlog } from './../blog-card/blog-card.component.spec';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import { IPortalUser } from './../../core/interfaces/fr-user.interface';
import { UserService } from './../../core/services/user/user.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticleComponent } from './manage-article.component';
import { of } from 'rxjs/observable/of';
import { PortalUser } from '../../core/interfaces/fr-user.interface';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { isDate } from 'util';

class BlogServiceMock extends BlogService {
  constructor (private _http : HttpClient) {
    super(_http);
  }

  public saveBlogPost () {
    return of( dummyBlog )
  }

  public updateBlogPost () {
    return of( dummyBlog )
  }

}

class UserServiceMock extends UserService {
  constructor (private _http : HttpClient) {
    super(_http);
  }

  public get user () {
    return of( new PortalUser(<IPortalUser>{
      id : 'asdf1234',
      firstName : 'Derek',
      lastName : 'Carter'
    }))
  }
}

const mockActivatedRoute = {
  data : of({
    BlogPost : dummyBlog
  }),
  snapshot : {
    url : [
      {path : 'edit'}
    ]
  }
}

describe('ManageArticleComponent', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        ClarityModule,
        HttpClientModule,
        EditorModule,
        NgSelectModule
      ],
      providers : [
        HttpClient,
        DatePipe,
        { provide : UserService , useClass : UserServiceMock, deps : [HttpClient]},
        { provide : ActivatedRoute, useValue : mockActivatedRoute},
        { provide : BlogService, useClass : BlogServiceMock, deps : [HttpClient] }
      ],
      declarations: [ 
        ManageArticleComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build a form', () => {
    const formAttributes = [
      'allowComments',
      'author',
      'category',
      'content',
      'id',
      'publicationDate',
      'subCategory',
      'summary',
      'tags',
      'title',
      'version'
    ].forEach(formControlName => {
      expect(component.form.controls[formControlName]).toBeDefined();
    });
  });

  it('should have required fields', () => {
    ['title', 'author', 'publicationDate', 'summary', 'content', 'allowComments'].forEach(formControlName => {
      expect(component.form.get(formControlName).invalid).toBeFalsy();
      component.form.get(formControlName).setValue(null);
      expect(component.form.get(formControlName).invalid).toBeTruthy();
    });
  });

  it('should require a category and sub category', () => {
    expect(component.form.get('category').invalid).toBeFalsy()
    expect(component.form.get('subCategory').invalid).toBeFalsy();
    
    component.form.get('category').setValue('');
    component.form.get('subCategory').setValue('');
    fixture.detectChanges();
    
    expect(component.form.get('category').invalid).toBeTruthy();
    expect(component.form.get('subCategory').invalid).toBeFalsy();
    
    component.form.get('category').setValue('Announcement');
    fixture.detectChanges();
    
    expect(component.form.get('category').invalid).toBeFalsy();
    expect(component.form.get('subCategory').invalid).toBeFalsy();

    component.form.get('category').setValue('Documentation');
    fixture.detectChanges();

    expect(component.form.get('category').invalid).toBeFalsy();
    expect(component.form.get('subCategory').invalid).toBeTruthy();
  });

  it('should update the date/time based on timezone', () => {
    const today = "09/14/2018"
    const newDate: Date = component['setDate'](today);

    expect(isDate(newDate)).toBeTruthy()
  });

  it('should only submit if the form is valid', () => {
    component.handleSubmit();

    console.log(component.form.invalid);
    
    expect(component.submitted).toBeTruthy();
  })
});