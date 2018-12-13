import { DocumentationArea, DefaultDocumentationArea } from './../../core/interfaces/documentation-area.interface';
import { CoreSharedModule } from './../../core/core-shared/core-shared.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentationComponent } from './manage-documentation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from '../../../../node_modules/ngx-toastr';
import { Documentation, DefaultDocumentation } from '../../core/interfaces/documentation.interface';

describe('ManageDocumentationComponent', () => {
  let component: ManageDocumentationComponent;
  let fixture: ComponentFixture<ManageDocumentationComponent>;
  
  let documentationArea: DocumentationArea = DefaultDocumentationArea;
  
  let document: Documentation = DefaultDocumentation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        CoreSharedModule,
        ToastrModule.forRoot(),
        EditorModule
      ],
      declarations: [ ManageDocumentationComponent ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentationComponent);
    component = fixture.componentInstance;

    documentationArea.id = 'asdf-1234-difh2-0d9fk';
    documentationArea.slug = 'area_test';
    documentationArea.name = 'Area Test';

    component.documentationArea = documentationArea;
    component.documentation = document;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build a form', () => {
    let formElements = ['id', 'version', 'name', 'slug', 'description', 'content', 'published', 'userPrivileges', 'parentSlug', 'tags'];

    formElements.forEach(element => {
      expect( component.form.get(element) ).toBeDefined();
    });

    expect( component.form.get('slug').disabled ).toBeTruthy();
  });

  it('should have the correct title based on statue: create', () => {
    expect(component.title).toEqual('Add New ' + component.documentationArea.name + ' Document');
  });

  it('should have the correct title based on statue: edit', () => {
    let instanceDocument = Object.assign({}, document);
    instanceDocument.id = '4312-defg-3k9jh-asdf';
    instanceDocument.name = 'New Document';
    instanceDocument.slug = 'new_document';

    component.documentation = instanceDocument;

    component.ngOnInit();

    expect(component.title).toEqual('Edit ' + component.documentation.name);
  });

  it('should set the correct save method: create', () => {
    expect(component.saveMethod).toEqual('createDocumentation');
  });

  it('should set the correct save method: update', () => {
    let instanceDocument = Object.assign({}, document);
    instanceDocument.id = '4312-defg-3k9jh-asdf';
   
    component.documentation = instanceDocument;

    component.ngOnInit();

    expect(component.saveMethod).toEqual('updateDocumentation');
  });
});
