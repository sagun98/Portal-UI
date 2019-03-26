import { Documentation } from '../../core/interfaces/documentation.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { EntityComponent } from '../../core/classes/EntityComponent';
import { PermissionsService } from '../../core/services/permissions/permissions.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent extends EntityComponent implements OnInit {

  @Input() documentation : Documentation;

  constructor(
    private activatedRoute : ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private permissionsService: PermissionsService
  ) { 
    super();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.documentation = data.Documentation || this.documentation;

      setTimeout(t => {
        document['removeAllListeners']('focus');
        window['removeAllListeners']('message');
      }, 1000);
    });
  }

  public get safeContent () {
    return this.domSanitizer.bypassSecurityTrustHtml( this.documentation.content );
  }

  protected getPermissionService(): PermissionsService {
    return this.permissionsService;
  }
}
