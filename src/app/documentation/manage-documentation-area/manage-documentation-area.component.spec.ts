import { DocumentationArea, DefaultDocumentationArea } from '../../core/interfaces/documentation-area.interface';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageDocumentationAreaComponent } from './manage-documentation-area.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ManageDocumentationAreaComponent', () => {
  let component: ManageDocumentationAreaComponent;
  let fixture: ComponentFixture<ManageDocumentationAreaComponent>;
  let documentationArea: DocumentationArea = Object.assign({}, DefaultDocumentationArea);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        EditorModule
      ],
      declarations: [ ManageDocumentationAreaComponent ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentationAreaComponent);
    component = fixture.componentInstance;

    component.documentationArea = documentationArea;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build a form', () => {
    const formElementNames = ['id','name','description','slug','version','position','documents'];

    component['buildForm']();

    formElementNames.forEach(formElement => {
      expect(component.form.get(formElement)).toBeDefined();
    });

    expect(component.form.get('slug').disabled).toBeTruthy();
  });

  it('should set a slug name', () => {
    component.documentationArea = documentationArea;

    component['buildForm']();

    const name = 'this is a test';

    component.form.get('name').setValue(name);

    expect(component.form.get('name').invalid).toBeFalsy();

    expect(component.form.get('slug').value).toEqual( 'this_is_a_test' );
  });

  it('should set the title based on state: create', () => {
    expect(component.title).toEqual('Create Documentation Area');
  });

  it('should set the title based on state: edit', () => {
    let name = "TEST AREA";
    
    documentationArea.id = 'abcd-2134k-3n8h-0dpoe';
    documentationArea.name = name;

    component.documentationArea = documentationArea;
    component.ngOnInit();

    expect(component.title).toEqual('Edit ' + name);
  });
});
