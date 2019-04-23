import { BehaviorSubject, of } from 'rxjs';
import { PortalUser } from '../../interfaces/fr-user.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SideNavigationComponent } from './side-navigation.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CRUD } from '../../enums/crud.enum';
import { CoreSharedModule } from '../../core-shared/core-shared.module';
import { UserService } from '../../services/user/user.service';
import { Product } from '../../interfaces/product.interface';
import { API } from '../../interfaces/api.interface';
import { APIListChange } from '../../interfaces/api-list-change.interface';
import { ProductListChange } from '../../interfaces/product-list-change.interface';


class RouterStub {
  navigateByUrl = jasmine.createSpy('navigateByUrl');
}

export const mockUser = new PortalUser({
  id : "test",
  "email" : "test@test.com",
  "firstName" : "test",
  "lastName" : "testington",
  "name" : "test testington",
  "roles" : [ {"name" : "ADMIN", "privileges" : [{}] } ],
  "token" : "1234",
  "username" : "UTESTT4"
});

export class MockUserService extends UserService {
  constructor ( private _http : HttpClient ) {
    super(_http);

    this._user = mockUser;
  }

  public getUser () {
    this._user = mockUser;
    this._lastUser.next(mockUser);
    return of(mockUser);
  }

  public _lastUser: BehaviorSubject<PortalUser> = new BehaviorSubject<PortalUser>(mockUser);
}

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  
  const products: Product[] = [ <Product> {name : "Product Group", id : "4321fdsa", description : "Description"}];
  const apis: API[] =  [ <API> {name : "Product API", id : "1234asdf", description : "Description"}];

  const mockApiListChangeAdd: APIListChange = {
    action : CRUD.CREATE,
    api : <API> {
      id : ';laksdfjafd',
      name : "New Testing API",
      description : "Some new description"
    }
  }

  const mockApiListChangeUpdate: APIListChange = {
    action : CRUD.UPDATE,
    api : <API> {
      id : '1234asdf',
      name : "New Testing API",
      description : "Some new description"
    }
  }

  const mockProductListChangeAdd: ProductListChange = {
    action : CRUD.CREATE,
    product : <Product> {
      id : 'asdf0987',
      name : 'Some New Product',
      description : 'Some product description',
      overview : 'this is an overview'
    }
  }

  const mockProductListChangeUpdate: ProductListChange = {
    action : CRUD.UPDATE,
    product : <Product> {
      id : '4321fdsa',
      name : 'Some New Product',
      description : 'Some product description',
      overview : 'this is an overview'
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        HttpClientModule,
        CoreSharedModule,
        RouterTestingModule.withRoutes([])
      ],
      providers : [
        HttpClient,
        { provide : UserService , useClass : MockUserService, deps : [HttpClient] }
      ],
      declarations: [ 
        SideNavigationComponent

      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;

    component.products = products;
    component.apis = apis;

    fixture.detectChanges();
  });

  it('should strip API from the api list', () => {
    const filteredName = component.apisFiltered[0].name;
    expect( /API/gi.test( filteredName ) ).toBeFalsy();
  });

  it('should add a new api to the list', fakeAsync(() => {
    component['apiService'].$onApiListChanged.next(mockApiListChangeAdd);

    fixture.detectChanges();

    expect(component.apisFiltered.length).toEqual(2);
  }));

  it('should update an existing api', () => {
    component['apiService'].$onApiListChanged.next(mockApiListChangeUpdate);

    fixture.detectChanges();

    expect(component.apisFiltered[0].description).toEqual(mockApiListChangeUpdate.api.description);
  });

  it('should add a new product to the list', fakeAsync(() => {
    component['productService'].$onProductListChanged.next(mockProductListChangeAdd);

    fixture.detectChanges();

    expect(component.products.length).toEqual(2);
  }));

  it('should update an product', () => {
    component['productService'].$onProductListChanged.next(mockProductListChangeUpdate);

    fixture.detectChanges();

    expect(component.products[0].id).toEqual(mockProductListChangeUpdate.product.id);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
