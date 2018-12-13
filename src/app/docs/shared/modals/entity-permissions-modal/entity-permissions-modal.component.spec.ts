import { mockApi } from './../../../product/view-product/view-product.component.spec';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPermissionsModalComponent } from './entity-permissions-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('EntityPermissionsModalComponent', () => {
  let component: EntityPermissionsModalComponent;
  let fixture: ComponentFixture<EntityPermissionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      declarations: [ EntityPermissionsModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPermissionsModalComponent);
    component = fixture.componentInstance;

    component.entity = mockApi;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
