import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmailComponent } from './email.component';
import { EditorModule } from '../../../../../node_modules/@tinymce/tinymce-angular';

describe('EmailComponent', () => {
  let component: EmailComponent;
  let fixture: ComponentFixture<EmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        ClarityModule
      ],
      declarations: [ EmailComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.form.invalid).toBeTruthy()
  });

  it('should have an invalid form on init', () => {
    expect(component.form.invalid).toBeTruthy()
  });

  it('should set submitted to true after sendEmail is called', () => {
    component.sendEmail();

    expect(component.submitted).toBeTruthy()
  });

  it('should be valid if subject and body are not null', () => {
    component.form.get('subject').setValue('subject');
    component.form.get('body').setValue('<p>body</p>');
    component.sendEmail();
    expect(component.submitted).toBeTruthy();
    expect(component.form.valid).toBeTruthy();
  })
});
