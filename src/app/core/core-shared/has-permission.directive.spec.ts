import { HttpClientModule } from '@angular/common/http';
// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HasPermissionDirective} from './has-permission.directive';
import {Component, Directive, ElementRef} from '@angular/core';
import {PermissionsService} from '../services/permissions/permissions.service';
import {UserService} from '../services/user/user.service';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {}
}
class MockPermissionsService extends PermissionsService {
}
      
class MockUserService extends UserService {
}
      
@Component({
  template: `
    <div [hasPermission]="hasPermission" [initialDisplay]="initialDisplay" ></div>
  `
})
class DirectiveTestComponent {
  hasPermission: any[];  initialDisplay: string;

}

describe('HasPermissionDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [HasPermissionDirective, DirectiveTestComponent],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
        {provide: PermissionsService, useClass: MockPermissionsService},
        {provide: UserService, useClass: MockUserService},
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(HasPermissionDirective));
    directive = directiveEl.injector.get(HasPermissionDirective);
  }));

  it("should run a directive", async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

    
  it('should run #ngOnInit()', async(() => {
    // const result = directive.ngOnInit();
  }));
      
});