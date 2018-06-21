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

describe('ManageArticleComponent', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        FormsModule,
        ClarityModule,
        HttpClientModule,
        EditorModule
      ],
      providers : [
        HttpClient,
        { provide : UserService , useClass : UserServiceMock, deps : [HttpClient]},
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
});
