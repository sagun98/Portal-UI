import { CoreSharedModule } from './../../../core/core-shared/core-shared.module';
import { ViewApiComponent } from '../../api/view-api/view-api.component';
import { ViewProductComponent } from './view-product.component';
import { ApiService } from '../../api/api.service';
import { API } from '../../api/interfaces/api.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../interfaces/product.interface';
import { UserService } from '../../../core/services/user/user.service';
import { MockUserService } from '../../../core/layouts/side-navigation/side-navigation.component.spec';


const mockApi: API = {
  id : 'qwers12345',
  name : 'Mock API',
  description : 'Mock API Description',
  slug : 'test',
  userPrivileges : [],
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
    name : "Mock Product",
    description : 'Mock Product Description',
    slug : 'test',
    overview : null,
    apis : [],
    "userPrivileges" : [
      {
        "username" : "UTESTT4",
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
        HttpClientModule,
        CoreSharedModule
      ],
      declarations: [
        ViewApiComponent,
        ViewProductComponent
      ],
      providers : [
        { provide : UserService, useClass : MockUserService, deps : [HttpClient] },
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

  it('should set an api after requesting one by id', () => {
    component.getApiDefinition(1234, true);

    fixture.detectChanges();

    expect(component.activeApi).toBeDefined();

    expect(component.activeApi.id).toEqual(mockApi.id);

    expect(component.activeApi.name).toEqual(mockApi.name);
  })
});
