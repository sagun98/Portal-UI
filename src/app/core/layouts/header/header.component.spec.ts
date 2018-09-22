import { Angulartics2Module, Angulartics2 } from 'angulartics2';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Angulartics2GoogleGlobalSiteTagOverride } from '../../../shared/angulartics-2-google-global-site-tag-override.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        ClarityModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        Angulartics2Module.forRoot([Angulartics2GoogleGlobalSiteTagOverride]),
        RouterTestingModule
      ],
      providers : [
        HttpClient,
        ToastrService,
        Angulartics2,
        Angulartics2GoogleGlobalSiteTagOverride

      ],
      declarations: [ HeaderComponent ],
      schemas : [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default title', () => {
    const title = component.title;
    expect(title).toEqual("Pearson Developer Title");
  })
});
