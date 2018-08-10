import { PermissibleEntity } from './../../../core/interfaces/permissible.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { MockUserService } from './../../../core/layouts/side-navigation/side-navigation.component.spec';
import { CoreSharedModule } from './../../../core/core-shared/core-shared.module';
import { ApiService } from '../api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ManageApiComponent } from './manage-api.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { API } from '../interfaces/api.interface';
import { of } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user/user.service';
import { UserPrivilegeClass } from '../../../core/classes/user-privilege';

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
  file : null,
  "slug" : "test-api",
  "userPrivileges" : [
    {
      "username" : "UTESTT4",
      "permissions" : ["ADMIN", "MODIFY"]
    }
  ]
}

class MockApiService extends ApiService {
  constructor (private _http: HttpClient) {
    super(_http);
  }

  public addApi () {
    return of(mockApi);
  }

  getPrivileges () {
    return of(<UserPrivilegeClass[]> [{
      "username" : "TTESTT4",
      "permissions" : []
    }])
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
        CoreSharedModule,
        NgSelectModule,
        ToastrModule.forRoot()
      ],
      providers : [
        { provide : ApiService, useClass : MockApiService, deps : [HttpClient] },
        { provide : UserService, useClass : MockUserService, deps : [HttpClient] },
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
    component.api = mockApi;
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
    component.api.title = '';
    component.api.description = '';

    component['buildForm']();

    component.saveApi();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should set the form to valid if required fields are provided', () => {
    component.form.get('name').setValue('name');
    component.form.get('description').setValue('description');

    component.saveApi();

    expect(component.form.invalid).toBeFalsy();
  });

  it('should open privileges modal', fakeAsync(() => {
    component.openManageApiPrivilegesModal()

    tick();

    tick();

    expect(component.managePrivilegesModalOpened).toBeTruthy();
  }));

  it('should disabled the form is user doesnt have permission', () => {
    
    component.disableFormBasedOnPrivileges(component.form, <PermissibleEntity> {
      "userPrivileges" : [{
        "permissions" : [],
        "username" : "UTESTT4"
      }]
    });

    expect( component.form.disabled ).toBeFalsy();
  });
});