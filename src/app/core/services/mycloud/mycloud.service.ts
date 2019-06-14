import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MycloudService {

  constructor() { }

  get env () {
    if (window.location.hostname == "dev.code-test.aws.pearson.com")
      return "DEV";
    else if (window.location.hostname == "test.code-test.aws.pearson.com")
      return "TEST";
    else if (window.location.hostname == "code.pearson.com")
      return "PROD";
    else
      return "LOCAL";
  }

  get myCloudLoginUrl () {
    if(this.env === "DEV")
      return "https://mycloudtest.pearson.com/redirect?url=" + window.location.href;
    
    if(this.env === "TEST" || this.env === "PROD")
      return "https://mycloud.pearson.com/redirect?url=" + window.location.href;
  }
}
