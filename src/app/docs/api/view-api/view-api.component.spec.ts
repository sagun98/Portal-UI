import { MockUserService } from '../../../core/layouts/side-navigation/side-navigation.component.spec';
import { ViewApiComponent } from './view-api.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { of } from 'rxjs/observable/of';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreSharedModule } from '../../../core/core-shared/core-shared.module';
import { UserService } from '../../../core/services/user/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('ViewApiComponent', () => {
  let component: ViewApiComponent;
  let fixture: ComponentFixture<ViewApiComponent>;

  const swaggerJson = {
    "swagger": "2.0",
    "info": {
      "version": "1.0.0",
      "title": "Swagger Petstore",
      "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
      "termsOfService": "http://swagger.io/terms/",
      "contact": {
        "name": "Swagger API Team"
      },
      "license": {
        "name": "MIT"
      }
    },
    "host": "petstore.swagger.io",
    "basePath": "/api",
    "schemes": [
      "http"
    ],
    "consumes": [
      "application/json"
    ],
    "produces": [
      "application/json"
    ],
    "paths": {
      "/pets": {
        "get": {
          "description": "Returns all pets from the system that the user has access to",
          "operationId": "findPets",
          "produces": [
            "application/json",
            "application/xml",
            "text/xml",
            "text/html"
          ],
          "parameters": [
            {
              "name": "tags",
              "in": "query",
              "description": "tags to filter by",
              "required": false,
              "type": "array",
              "items": {
                "type": "string"
              },
              "collectionFormat": "csv"
            },
            {
              "name": "limit",
              "in": "query",
              "description": "maximum number of results to return",
              "required": false,
              "type": "integer",
              "format": "int32"
            }
          ],
          "responses": {
            "200": {
              "description": "pet response",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Pet"
                }
              }
            },
            "default": {
              "description": "unexpected error",
              "schema": {
                "$ref": "#/definitions/ErrorModel"
              }
            }
          }
        },
        "post": {
          "description": "Creates a new pet in the store.  Duplicates are allowed",
          "operationId": "addPet",
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "name": "pet",
              "in": "body",
              "description": "Pet to add to the store",
              "required": true,
              "schema": {
                "$ref": "#/definitions/NewPet"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "pet response",
              "schema": {
                "$ref": "#/definitions/Pet"
              }
            },
            "default": {
              "description": "unexpected error",
              "schema": {
                "$ref": "#/definitions/ErrorModel"
              }
            }
          }
        }
      },
      "/pets/{id}": {
        "get": {
          "description": "Returns a user based on a single ID, if the user does not have access to the pet",
          "operationId": "findPetById",
          "produces": [
            "application/json",
            "application/xml",
            "text/xml",
            "text/html"
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID of pet to fetch",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "200": {
              "description": "pet response",
              "schema": {
                "$ref": "#/definitions/Pet"
              }
            },
            "default": {
              "description": "unexpected error",
              "schema": {
                "$ref": "#/definitions/ErrorModel"
              }
            }
          }
        },
        "delete": {
          "description": "deletes a single pet based on the ID supplied",
          "operationId": "deletePet",
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID of pet to delete",
              "required": true,
              "type": "integer",
              "format": "int64"
            }
          ],
          "responses": {
            "204": {
              "description": "pet deleted"
            },
            "default": {
              "description": "unexpected error",
              "schema": {
                "$ref": "#/definitions/ErrorModel"
              }
            }
          }
        }
      }
    },
    "definitions": {
      "Pet": {
        "type": "object",
        "allOf": [
          {
            "$ref": "#/definitions/NewPet"
          },
          {
            "required": [
              "id"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              }
            }
          }
        ]
      },
      "NewPet": {
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string"
          },
          "tag": {
            "type": "string"
          }
        }
      },
      "ErrorModel": {
        "type": "object",
        "required": [
          "code",
          "message"
        ],
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          }
        }
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        EditorModule,
        ClarityModule,
        CoreSharedModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers : [
        HttpClient,
        FormBuilder,
        ToastrService,
        { provide : UserService, useClass : MockUserService, deps : [HttpClient]},
        {
          provide : ActivatedRoute, useValue : {
            data : of({
              api : {
                swagger : swaggerJson,
                overview : "<div><a id=\"external-link\" href=\"https://nfl.com\">This is an external link</a></div>",
                gettingStarted : "<div><a id=\"getting-started\" href=\"#anchor\">Getting Started</a></div>",
                reference : "<div>This is some reference content</div>",
              }
            }),
            snapshot : {}
          }
        }
      ],
      declarations: [ ViewApiComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should click external link', () => {
    component.overviewSafe;
    let href: HTMLElement = document.querySelector("#overview a");
    href.click();
  });

  it('should go to an anchor', () => {
    let href: HTMLElement = document.querySelector("#getting-started a");
    href.click();
  });

  it('should render content when present', () => {
    let overviewContent: HTMLElement = document.getElementById("overview");
    let gettingStartedContent: HTMLElement = document.getElementById("getting-started");

    expect(overviewContent).not.toBeNull();
    expect(gettingStartedContent).not.toBeNull();
  });

  it('should not render content when not present', () => {
    component.api.overview = '';
    component.api.gettingStarted = '';

    fixture.detectChanges();

    let overviewContent: HTMLElement = document.getElementById("overview");
    let gettingStartedContent: HTMLElement = document.getElementById("getting-started");

    expect(overviewContent).toBeNull();
    expect(gettingStartedContent).toBeNull();
  });
});
