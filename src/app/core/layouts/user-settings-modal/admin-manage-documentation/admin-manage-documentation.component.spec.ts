import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageDocumentationComponent } from './admin-manage-documentation.component';

describe('AdminManageDocumentationComponent', () => {
  let component: AdminManageDocumentationComponent;
  let fixture: ComponentFixture<AdminManageDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      declarations: [ AdminManageDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
