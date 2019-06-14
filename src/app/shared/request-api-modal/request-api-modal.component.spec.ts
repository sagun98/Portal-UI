import { CookieParserService } from './../../core/services/cookie-parser/cookie-parser.service';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestApiModalComponent } from './request-api-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { MockUserService } from '../../core/layouts/side-navigation/side-navigation.component.spec';

describe('RequestApiModalComponent', () => {
  let component: RequestApiModalComponent;
  let fixture: ComponentFixture<RequestApiModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ClarityModule,
        ToastrModule.forRoot()
      ],
      providers : [{ provide : UserService, useClass : MockUserService, deps : [HttpClient, CookieParserService] }],
      declarations: [ RequestApiModalComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestApiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should be invalid if the api name is empty / null', () => {
    component['buildForm']();

    component.submitted = true;

    expect(component.form.invalid).toBe(true);
  });

  it('should be valid if the api name is populated', () => {
    component['buildForm']();

    component.form.get('name').setValue('name');

    component.submitted = true;

    fixture.detectChanges();

    expect(component.form.invalid).toBe(false);
  });
});
