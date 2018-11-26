import { IPortalUser, UserRole, UserPrivilege } from '../../../interfaces/fr-user.interface';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCardComponent } from './role-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PortalUser } from '../../../interfaces/fr-user.interface';

const API_PRIVILEGES = [
  <UserPrivilege> {name : 'API_CREATE', id : '1234', authority : 'API_CREATE'},
  <UserPrivilege> {name : 'API_READ', id : '4312', authority : 'API_READ'},
  <UserPrivilege> {name : 'API_UPDATE', id : '2233', authority : 'API_UPDATE'},
  <UserPrivilege> {name : 'API_DELETE', id : '5431', authority : 'API_DELETE'}
]

const PRODUCT_PRIVILEGES = [
  <UserPrivilege> {name : 'PRODUCT_CREATE', id : '1234', authority : 'PRODUCT_CREATE'},
  <UserPrivilege> {name : 'PRODUCT_READ', id : '4312', authority : 'PRODUCT_READ'},
  <UserPrivilege> {name : 'PRODUCT_UPDATE', id : '2233', authority : 'PRODUCT_UPDATE'},
  <UserPrivilege> {name : 'PRODUCT_DELETE', id : '5431', authority : 'PRODUCT_DELETE'}
]

export const AdminTestUser = new PortalUser(<IPortalUser> {
  firstName : 'firstName',
  lastName : 'lastName',
  username : 'username',
  roles : [
    <UserRole> {
      id : '1234-hjkl-1234-dlkj',
      name : 'ADMIN',
      privileges : [
        ...PRODUCT_PRIVILEGES,
        ...API_PRIVILEGES
      ]
    }
  ]
});

export const ApiDeveloperTestUser = new PortalUser(<IPortalUser> {
  firstName : 'firstName',
  lastName : 'lastName',
  username : 'username',
  roles : [
    <UserRole> {
      id : '1234-hjkl-1234-dlkj',
      name : 'API_DEVELOPER',
      privileges : API_PRIVILEGES
    }
  ]
});

export const ProductOwnerTestUser = new PortalUser(<IPortalUser> {
  firstName : 'firstName',
  lastName : 'lastName',
  username : 'username',
  roles : [
    <UserRole> {
      id : '1234-hjkl-1234-dlkj',
      name : 'PRODUCT_OWNER',
      privileges : PRODUCT_PRIVILEGES
    }
  ]
});

describe('RoleCardComponent', () => {
  let component: RoleCardComponent;
  let fixture: ComponentFixture<RoleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers : [
        HttpClient
      ],
      declarations: [ RoleCardComponent ],
      schemas : [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCardComponent);
    component = fixture.componentInstance;

    component.title = 'Card Title';
    component.role = 'API_DEVELOPER';
    component.user = AdminTestUser;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasRole should be true', () => {
    expect(component.hasRole).toBeTruthy();
  });

  it('hasRole should be false', () => {

    component.user = ProductOwnerTestUser;

    expect(component.hasRole).toBeFalsy();
  });
});
