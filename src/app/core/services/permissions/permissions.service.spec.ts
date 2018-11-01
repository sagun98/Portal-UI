import { UserService } from './../user/user.service';
import { AdminTestUser, ApiDeveloperTestUser, ProductOwnerTestUser } from './../../layouts/user-settings-modal/role-card/role-card.component.spec';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {PermissionsService} from './permissions.service';
import { mockApi } from '../../../docs/product/view-product/view-product.component.spec';
import { Privilege } from '../../interfaces/permissible.interface';
import { MockUserService, mockUser } from '../../layouts/side-navigation/side-navigation.component.spec';

describe('PermissionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers: [
        HttpClient,
        {provide : UserService, useClass : MockUserService, deps : [HttpClient]},
        PermissionsService
      ]
    });
  });
    
  it('should run #hasRole()', inject([PermissionsService], (service: PermissionsService) => {
    
    expect(service.hasRole(['ADMIN'], AdminTestUser.roles)).toBeTruthy();
    expect(service.hasRole(['ADMIN'], ApiDeveloperTestUser.roles)).toBeFalsy();
    expect(service.hasRole(['ADMIN'], ProductOwnerTestUser.roles)).toBeFalsy();

    expect(service.hasRole(['ADMIN', 'API_DEVELOPER'], ProductOwnerTestUser.roles)).toBeFalsy();
    expect(service.hasRole(['ADMIN', 'API_DEVELOPER'], ApiDeveloperTestUser.roles)).toBeTruthy();
  }));
        
  it('should run #matchesAnyPermissions()', inject([PermissionsService], (service: PermissionsService) => {
    expect(service.matchesAnyPermissions(['API_CREATE'], ApiDeveloperTestUser.roles)).toBeTruthy();
    expect(service.matchesAnyPermissions(['PRODUCT_CREATE'], ApiDeveloperTestUser.roles)).toBeFalsy();
    expect(service.matchesAnyPermissions(['API_CREATE'], AdminTestUser.roles)).toBeTruthy();
    expect(service.matchesAnyPermissions(['PRODUCT_CREATE'], AdminTestUser.roles)).toBeTruthy();
  }));
        
  it('should run #isEntityAdmin()', inject([PermissionsService], (service: PermissionsService) => {
    const api = Object.assign({}, mockApi);

    api.userPrivileges = [<Privilege>{username : mockUser.username , permissions : ['MODIFY', 'ADMIN']}];
    expect(service.isEntityAdmin(api)).toBeTruthy();

    api.userPrivileges = [<Privilege>{username : mockUser.username , permissions : ['MODIFY']}];
    expect(service.isEntityAdmin(api)).toBeFalsy();
  }));
        
  it('should run #hasPermission()', inject([PermissionsService], (service: PermissionsService) => {
    const api = Object.assign({}, mockApi);

    api.userPrivileges = [<Privilege>{username : mockUser.username , permissions : ['MODIFY', 'ADMIN']}];
    expect(service.hasPermission(api, 'MODIFY')).toBeTruthy();

    api.userPrivileges = [<Privilege>{username : mockUser.username , permissions : ['ADMIN']}];
    expect(service.hasPermission(api, 'MODIFY')).toBeFalsy();
  }));
        
  it('should run #hasOnlyPermission()', inject([PermissionsService], (service: PermissionsService) => {
    const api = Object.assign({}, mockApi);

    api.userPrivileges = [<Privilege>{username : mockUser.username , permissions : ['MODIFY', 'ADMIN']}];
    expect(service.hasOnlyPermission(api, 'MODIFY')).toBeFalsy();

    api.userPrivileges = [<Privilege>{username : mockUser.username , permissions : ['MODIFY']}];
    expect(service.hasOnlyPermission(api, 'MODIFY')).toBeTruthy();
  }));
      
});
