import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENTATION_LINKS } from '../core/constants/documentation-links.constant';

describe('HomeComponents', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ 
        HomeComponent
      ],
      providers : [
        HttpClient,
        {
          provide : ActivatedRoute, useValue : {
            data : of({
              NodeBBBlogs : {
                blogs : {
                  topics : []
                },
                generalSupport : {
                  topics : []
                }
              }
            }),
            snapshot : {
              data : {
                productData : [{name : 'Product 1', description : "This is a description", id : '1234lkasdfa1234adf'}]
              }
            }
          }
        }
      ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct link', () => {
    let mainDocumentationElement = <HTMLElement> document.getElementById("main-documentation");
    let mainGettingStartedElement = <HTMLElement> document.getElementById("main-getting-started");
    let documentationElement = <HTMLElement> document.getElementById("documentation");

    let creatingApisElement = <HTMLElement> document.getElementById("creating-apis");
    let consumingApisElement = <HTMLElement> document.getElementById("consuming-apis");

    let mainDocumentationLink = mainDocumentationElement.getAttribute("href");
    let mainGettingStartedLink = mainGettingStartedElement.getAttribute("href");
    let documentationLink = documentationElement.getAttribute("href");
    let creatingApisLink = creatingApisElement.getAttribute("href");
    let consumingApisLink = consumingApisElement.getAttribute("href");

    expect(mainDocumentationLink).toEqual(DOCUMENTATION_LINKS.DOCUMENTATION);
    expect(mainGettingStartedLink).toEqual(DOCUMENTATION_LINKS.GETTING_STARTED);
    expect(documentationLink).toEqual(DOCUMENTATION_LINKS.DOCUMENTATION);
    expect(creatingApisLink).toEqual(DOCUMENTATION_LINKS.CREATING_APIS);
    expect(consumingApisLink).toEqual(DOCUMENTATION_LINKS.CONSUMING_APIS);
  });
});
