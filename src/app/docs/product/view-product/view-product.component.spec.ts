import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { API_MANAGEMENT_TOOLS } from '../../../core/enums/api-management-tools.enum';
import { ApigeeApiTool } from '../../../core/interfaces/apigee-api-tool.interface';
import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { ViewApiComponent } from '../../api/view-api/view-api.component';
import { ViewProductComponent } from './view-product.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../core/services/user/user.service';
import { MockUserService } from '../../../core/layouts/side-navigation/side-navigation.component.spec';
import { API } from '../../../core/interfaces/api.interface';
import { ApiService } from '../../../core/services/api-service/api.service';
import { Product } from '../../../core/interfaces/product.interface';
import { CookieParserService } from 'src/app/core/services/cookie-parser/cookie-parser.service';

export const mockApi: API = {
  id : 'qwers12345',
  name : 'Mock API',
  description : 'Mock API Description',
  slug : 'test',
  userPrivileges : [],
  apiManagementTool : <ApigeeApiTool> {
    id : 'mock',
    org : 'mock',
    name : API_MANAGEMENT_TOOLS.APIGEE
  },
  published : false
};

class MockApiService extends ApiService {
  constructor(private _http : HttpClient) {
    super(_http);
  }

  public getApi(id: string){
    return of(mockApi);
  }
}

describe('ViewProductComponent', () => {
  let component: ViewProductComponent;
  let fixture: ComponentFixture<ViewProductComponent>;

  const mockProduct: Product = {
    id : 'asdf1234',
    name : "Mock Product PLEASE",
    description : 'Mock Product Description',
    slug : 'test',
    overview : null,
    apis : [mockApi, mockApi, mockApi],
    userPrivileges : [
      {
        "username" : "UTESTT4",
        "email" : "UTESTT4@pearson.com",
        "permissions" : ["ADMIN"]
      }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NoopAnimationsModule,
        ToastrModule.forRoot(),
        CoreSharedModule
      ],
      declarations: [
        ViewApiComponent,
        ViewProductComponent
      ],
      providers : [
        ToastrService,
        { provide : UserService, useClass : MockUserService, deps : [HttpClient, CookieParserService] },
        { provide : ApiService, useClass : MockApiService, deps : [HttpClient] },
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                product : mockProduct,
              }
            },
            data : of({
              product : mockProduct,
            })
          }
        }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductComponent);
    component = fixture.componentInstance;
    
    component['activatedRoute'].data = of({
      product : Object.assign({}, mockProduct),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set openApi to null if open is false', () => {
    component.getApiDefinition(1234, false);

    fixture.detectChanges();

    expect(component.activeApi).toBe(null);
  });

  it('should set an api after requesting one by id', fakeAsync(() => {
    component.getApiDefinition(1234, true);

    fixture.detectChanges();

    expect(component.activeApi).toBeNull();
    
    tick(1000);

    fixture.detectChanges();

    expect(component.activeApi).toBeDefined();

    expect(component.activeApi.id).toEqual(mockApi.id);

    expect(component.activeApi.name).toEqual(mockApi.name);
  }));

  it('should not show warning if all APIs are not unpublshed', () => {
    let newApi = Object.assign({}, mockApi);

    newApi.published = true;

    component.product.apis.push(newApi);

    component.ngOnInit();
    fixture.detectChanges();

    let unpublishedElement: HTMLElement = document.getElementById("all-unpublished");

    expect(unpublishedElement).toBeNull();
  });

  it('should show warning if all APIs are unpublshed', () => {
    let unpublishedElement: HTMLElement = document.getElementById("all-unpublished");
    expect(unpublishedElement).not.toBeNull();
  });
});
