import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingInterceptorComponent } from './loading-interceptor.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoadingInterceptorComponent', () => {
  let component: LoadingInterceptorComponent;
  let fixture: ComponentFixture<LoadingInterceptorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers : [
        HttpClient
      ],
      declarations: [ LoadingInterceptorComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
