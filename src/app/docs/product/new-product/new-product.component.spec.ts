import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewProductComponent } from './new-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { ApiComponent } from '../../api/api.component';
import { Product } from '../product.interface';
import { DevPortalAPI } from '../../api/api.model';
import { ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';


describe('NewProductComponent', () => {
  let component: NewProductComponent;
  let fixture: ComponentFixture<NewProductComponent>;

  const saveMethod = 'saveProduct';

  const mockProduct: Product = {
    id : 'asdf1234',
    name : "Mock Product",
    description : 'Mock Product Description',
    apis : []
  }

  const mockApis: DevPortalAPI[] = [{
    id : 'qwers12345',
    name : 'Mock API',
    description : 'Mock API Description',
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
        EditorModule
      ],
      declarations: [
        NewProductComponent,
        ApiComponent
      ],
      providers : [
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
    fixture = TestBed.createComponent(NewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
