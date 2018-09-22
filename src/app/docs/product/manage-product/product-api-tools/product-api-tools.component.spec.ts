import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApiToolsComponent } from './product-api-tools.component';

describe('ProductApiToolsComponent', () => {
  let component: ProductApiToolsComponent;
  let fixture: ComponentFixture<ProductApiToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductApiToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductApiToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
