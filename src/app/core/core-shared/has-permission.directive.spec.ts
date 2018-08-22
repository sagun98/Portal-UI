import { mockUser } from '../layouts/side-navigation/side-navigation.component.spec';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HasPermissionDirective} from './has-permission.directive';
import {Component, Directive, ElementRef} from '@angular/core';
import {PermissionsService} from '../services/permissions/permissions.service';
import {UserService} from '../services/user/user.service';
import { MockUserService } from '../layouts/side-navigation/side-navigation.component.spec';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {}
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
  let directive: HasPermissionDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [HasPermissionDirective, DirectiveTestComponent],
      providers: [
        PermissionsService,
        { provide: UserService, useClass: MockUserService, deps : [HttpClient]},
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
    directive.ngOnInit();

    expect(directive['element'].nativeElement.style.display).toEqual('');

    let updatedMockUser = Object.assign({}, mockUser);
    updatedMockUser.roles = [];

    directive['userService']['_user'] = updatedMockUser;
    directive['userService']._lastUser.next(updatedMockUser);

    expect(directive['element'].nativeElement.style.display).toEqual('none');
  }));      
});