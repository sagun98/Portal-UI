import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2GoogleGlobalSiteTagOverride } from './../../../shared/angulartics-2-google-global-site-tag-override.service';
import { Angulartics2Module } from 'angulartics2';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule,
        RouterTestingModule,
        Angulartics2Module.forRoot([Angulartics2GoogleGlobalSiteTagOverride])
      ],
      providers : [
        HttpClient
      ],
      declarations: [ UserCardComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
