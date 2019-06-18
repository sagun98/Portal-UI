import { ToastrModule } from 'ngx-toastr';
import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { ManageProductComponent } from './manage-product.component';
import { ViewApiComponent } from '../../api/view-api/view-api.component';
import { UserService } from '../../../core/services/user/user.service';
import { MockUserService } from '../../../core/layouts/side-navigation/side-navigation.component.spec';
import { Product } from '../../../core/interfaces/product.interface';
import { API } from '../../../core/interfaces/api.interface';
import { CookieParserService } from 'src/app/core/services/cookie-parser/cookie-parser.service';


describe('NewProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;

  const saveMethod = 'saveProduct';

  const mockProduct: Product = {
    id : 'asdf1234',
    name : "Mock Product",
    description : 'Mock Product Description',
    slug : 'test',
    userPrivileges : [],
    apis : []
  }

  const mockApis: API[] = [{
    id : 'qwers12345',
    name : 'Mock API',
    description : 'Mock API Description',
    slug : 'test',
    userPrivileges : [],
    published : true
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        HttpClientModule,
        RouterTestingModule,
        NgSelectModule,
        HttpClientModule,
        CoreSharedModule,
        ToastrModule.forRoot(),
        EditorModule
      ],
      declarations: [
        ManageProductComponent,
        ViewApiComponent
      ],
      providers : [
        { provide : UserService, useClass : MockUserService, deps : [HttpClient, CookieParserService] },
        {
          provide : ActivatedRoute, useValue : {
            snapshot : {
              data : {
                apis : mockApis,
                prodcut : mockProduct,
                saveMethod : saveMethod
              }
            },
            data : of({
              apis : mockApis,
              prodcut : mockProduct,
              saveMethod : saveMethod
            })
          }
        }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
