import { SwaggerUiComponent } from './../../../shared/swagger-ui/swagger-ui.component';
import { ApiService } from './../api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageApiComponent } from './manage-api.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { API } from '../interfaces/api.interface';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

const mockApi = <API> {
  id : 'asdf1234',
  name : 'API Name',
  description : 'API Description',
  version : 1,
  overview : 'this is an overview',
  gettingStarted : 'this is a gettings started section',
  reference : 'this is a reference section',
  swagger : '',
  swaggerUrl : '',
  file : null
}

class MockApiService extends ApiService {
  constructor (private _http: HttpClient) {
    super(_http);
  }

  public addApi () {
    return of(mockApi);
  }
}

describe('ManageApiComponent', () => {
  let component: ManageApiComponent;
  let fixture: ComponentFixture<ManageApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers : [
        { provide : ApiService, useClass : MockApiService, deps : [HttpClient] },
        HttpClient,
        ToastrService
      ],
      declarations: [ ManageApiComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build a form with the necessary form fields', () => {
    component['buildForm']();
    
    expect(component.form.get('id')).not.toBeNull();
    expect(component.form.get('version')).not.toBeNull();
    expect(component.form.get('name')).not.toBeNull();
    expect(component.form.get('description')).not.toBeNull();
    expect(component.form.get('overview')).not.toBeNull();
    expect(component.form.get('gettingStarted')).not.toBeNull();
    expect(component.form.get('reference')).not.toBeNull();
    expect(component.form.get('swagger')).not.toBeNull();
    expect(component.form.get('swaggerUrl')).not.toBeNull();
  });

  it('should build a form with pre-populated values', () => {
    component.api = mockApi;

    fixture.detectChanges();

    component['buildForm']();    

    expect(component.form.get('id').value).toEqual(mockApi.id);
    expect(component.form.get('version').value).toEqual(mockApi.version);
    expect(component.form.get('name').value).toEqual(mockApi.name);
    expect(component.form.get('description').value).toEqual(mockApi.description);
    expect(component.form.get('overview').value).toEqual(mockApi.overview);
    expect(component.form.get('gettingStarted').value).toEqual(mockApi.gettingStarted);
    expect(component.form.get('reference').value).toEqual(mockApi.reference);
    expect(component.form.get('swagger').value).toEqual(mockApi.swagger);
    expect(component.form.get('swaggerUrl').value).toEqual(mockApi.swaggerUrl);
  });

  it('should set submitted to true on save', () => {
    component.saveApi();

    expect(component.submitted).toBeTruthy();
  });

  it('should set the form to invalid', () => {
    component.saveApi();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should set the form to valid if required fields are provided', () => {
    component.form.get('name').setValue('name');
    component.form.get('description').setValue('description');

    component.saveApi();

    expect(component.form.invalid).toBeFalsy();
  });
});