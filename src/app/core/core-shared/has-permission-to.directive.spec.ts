import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {HasPermissionToDirective} from './has-permission-to.directive';
import {Component, Directive, ElementRef, OnInit} from '@angular/core';
import {UserService} from '../services/user/user.service';
import { PermissibleEntity } from '../interfaces/permissible.interface';
import { PermissionsService } from '../services/permissions/permissions.service';
import { MockUserService } from '../layouts/side-navigation/side-navigation.component.spec';

class MockElementRef extends ElementRef {
  constructor() { super(undefined); }
  nativeElement = {}
}
      
@Component({
  template: `
    <div [hasPermissionTo]="hasPermissionTo" [entity]="entity" ></div>
  `
})
class DirectiveTestComponent implements OnInit{
  hasPermissionTo: string = 'ADMIN';  
  
  entity: PermissibleEntity = <PermissibleEntity> {
    "userPrivileges" : [
      {
        "username" : "UTESTT4",
        "permissions" : ["ADMIN"]
      }
    ]
  };

  ngOnInit () {

  }
}

describe('HasPermissionToDirective', () => {
  let fixture: ComponentFixture<DirectiveTestComponent>;
  let component: DirectiveTestComponent;
  let directiveEl;
  let directive: HasPermissionToDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [HasPermissionToDirective, DirectiveTestComponent],
      providers: [
        PermissionsService,
        { provide: UserService, useClass: MockUserService, deps : [HttpClient]}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DirectiveTestComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(HasPermissionToDirective));
    directive = directiveEl.injector.get(HasPermissionToDirective);
  }));

  it("should run a directive", async(() => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  }));

    
  it('should run #ngOnChanges()', async(() => {
    fixture.detectChanges();
        
    console.log(directive['element'].nativeElement.style.display);
        
    expect(directive['element'].nativeElement.style.display).toEqual("");

    component.entity.userPrivileges[0].permissions=[""];

    fixture.detectChanges();

    expect(directive['element'].nativeElement.style.display).toEqual("");
  }));
      
});