import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UserSettingsModalComponent} from './user-settings-modal.component';
import {Component, Directive} from '@angular/core';
import {RolesService} from '../../services/roles/roles.service';
import { ToastrModule } from '../../../../../node_modules/ngx-toastr';

class MockRolesService extends RolesService {
}
      
describe('UserSettingsModalComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        UserSettingsModalComponent
      ],
      providers: [
        RolesService
      ],
      schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(UserSettingsModalComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async(() => {
    expect(component).toBeTruthy();
  }));
  
    
  it('should run #ngOnChanges()', async(() => {
    // const result = component.ngOnChanges(changes);
  }));
        
});