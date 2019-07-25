import { Component } from '@angular/core';
import { ApigeeTargetServers,  } from '../core/interfaces/apigee-target-server.interface';
import { DocumentationService } from '../documentation';

@Component({
  selector: 'app-apigee-target-servers',
  templateUrl: './apigee-target-servers.component.html',
  styleUrls: ['./apigee-target-servers.component.css'],
})
export class ApigeeTargetServersComponent  {

  targetServerSearch: string = ''; 
  apigeeTargetServers: ApigeeTargetServers[] = [];
  apigeeEnvironments : string[] = [];
  public environment: string = '';

  constructor(
    private documentationService: DocumentationService
  ) { 

  }

  public get filteredTargetServerList () {
    return this.apigeeTargetServers.filter(ts => {
      let rowData = ts.name.toLowerCase() + ts.host.toLowerCase();
      return (this.targetServerSearch.length) ? (rowData.indexOf(this.targetServerSearch.toLowerCase()) >= 0) : true;
    });
  }


  public onItemChange(env){
    let org = '';

    if (env === 'dev' || env === 'nft' || env === 'qa' || env === 'test'){
      org = 'pearson-nonprod';
    }
    else {
      org = 'pearson-prod';
    }
    
    this.environment = env;

    this.documentationService.getApigeeTargetServers(org,env).subscribe(targetServers => {
      this.targetServerSearch = '';
      this.apigeeTargetServers = targetServers;
    });
  }

  public onOrgChange(org){
    this.documentationService.getApigeeEnvironments(org).subscribe( environments => {
      this.apigeeEnvironments = environments;
    });
  }
}