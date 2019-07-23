import { Component, OnInit, Input } from '@angular/core';
import { PermissionsService } from '../core/services/permissions/permissions.service';
import { ApigeeTargetServers,  } from '../core/interfaces/apigee-target-server.interface';
import { DocumentationService } from '../documentation';
import { EntityComponent } from '../core/classes/EntityComponent';

@Component({
  selector: 'app-apigee-target-servers',
  templateUrl: './apigee-target-servers.component.html',
  styleUrls: ['./apigee-target-servers.component.css'],
})
export class ApigeeTargetServersComponent extends EntityComponent implements OnInit  {


  targetServerSearch: string; 
  apigeeTargetServers: ApigeeTargetServers[] = [];
  apigeeEnvironments : {};
  globalEnv: string;

  constructor(
    private documentationService: DocumentationService
  ) { 
    super();
  }

  protected getPermissionService(): PermissionsService {
    throw new Error("Method not implemented.");
  }


  ngOnInit() {

  }

   searchText() {
     if (this.targetServerSearch != ""){
      this.apigeeTargetServers = this.apigeeTargetServers.filter(res=>{
        return res.host.toLowerCase().match(this.targetServerSearch.toLowerCase()) || res.name.toLowerCase().match(this.targetServerSearch.toLowerCase());
      }); 
    }

    else if (this.targetServerSearch == ""){
      return this.onItemChange(this.globalEnv);
      }
    }


  onItemChange(env){
    this.globalEnv = env;
    let org = '';

    if (env === 'dev' || env === 'nft' || env === 'qa' || env === 'test'){
      org = 'pearson-nonprod';
    }
    else {
      org = 'pearson-prod';
    }
    this.apigeeTargetServers = [];
    this.documentationService.getApigeeTargetServers(org,env).subscribe((data:any) => {
      data.forEach(element => {
        this.apigeeTargetServers.push(element);
      });
    });
    return this.apigeeTargetServers;
  }

  onOrgChange(org){
    this.documentationService.getApigeeEnvironments(org).subscribe((environments: {}) => {
      this.apigeeEnvironments = environments;
    });
  }
}