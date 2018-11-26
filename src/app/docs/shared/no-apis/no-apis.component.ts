import { environment } from '../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { API } from '../../api/interfaces/api.interface';
import { NodeBBBlogsResolve, FORUM_CATEGORIES } from '../../../resolves/blogs.resolve';

@Component({
  selector: 'no-apis',
  templateUrl: './no-apis.component.html',
  styleUrls: ['./no-apis.component.scss']
})
export class NoApisComponent implements OnInit {
  
  @Input("title") title : string;
  @Input("no-content-text") noContextText: string;
  @Input("add-content-text") addContentText: string; 
  @Input("no-role-text") noRoleText: string; 
  @Input("request-role-text") requestRoleText: string; 

  public userRoleRequestUrl: string = '';

  constructor(
    private nodeBBBlogsResolve : NodeBBBlogsResolve
  ) { }

  ngOnInit() {
    this.nodeBBBlogsResolve.resolve(null, null).subscribe( (forumData: any) => {

      if(forumData && forumData.generalSupport && forumData.generalSupport.topics && forumData.generalSupport.topics.length){
        for(let i=0; i < forumData.generalSupport.topics.length; i++){
          let topic = forumData.generalSupport.topics[i];

          if(topic && topic.title && topic.title === FORUM_CATEGORIES.REQUEST_USER_ROLES)
            this.userRoleRequestUrl = `/forum/topic/${topic.tid}`;
        }
      }

      console.log(this.userRoleRequestUrl);
    });
  }

}
