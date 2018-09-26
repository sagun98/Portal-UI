import { of, Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApigeeApiToolComponent } from './apigee-api-tool.component';
import { ApigeeClientService } from '../../../../../core/services/apigee-client/apigee-client.service';

export class MockApigeeClientService extends ApigeeClientService {
  
  constructor (_http : HttpClient) {
    super(_http);
  }

  public getApigeeProducts(org: string) : Observable<string[]> {
    return <Observable<string[]>> of(['Product 1', 'Product 2', 'Product 3']);
  }

  public getApigeeApis(org: String) : Observable<string[]> {
    return <Observable<string[]>> of(['Api 1', 'Api 2', 'Api 3']);
  }

}

describe('ApigeeApiToolComponent', () => {
  let component: ApigeeApiToolComponent;
  let fixture: ComponentFixture<ApigeeApiToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers : [
        HttpClient,
        {provide : ApigeeClientService, useClass : MockApigeeClientService, deps : [HttpClient]}
      ],
      declarations: [ ApigeeApiToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApigeeApiToolComponent);
    component = fixture.componentInstance;

    component.parentForm = new FormGroup ({}) ;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
