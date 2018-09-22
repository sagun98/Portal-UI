import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';
import { TestBed, inject } from '@angular/core/testing';

import { Angulartics2GoogleGlobalSiteTagOverride } from './angulartics-2-google-global-site-tag-override.service';

describe('Angulartics2GoogleGlobalSiteTagOverrideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        Angulartics2Module.forRoot([Angulartics2GoogleGlobalSiteTagOverride]),
        RouterTestingModule
      ],
      providers: [Angulartics2GoogleGlobalSiteTagOverride]
    });
  });

  it('should be created', inject([Angulartics2GoogleGlobalSiteTagOverride], (service: Angulartics2GoogleGlobalSiteTagOverride) => {
    expect(service).toBeTruthy();
  }));
});
