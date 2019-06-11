import { Documentation } from '../../core/interfaces/documentation.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { EntityComponent } from '../../core/classes/EntityComponent';
import { PermissionsService } from '../../core/services/permissions/permissions.service';
import { DocumentationArea } from '../../core/interfaces/documentation-area.interface';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent extends EntityComponent implements OnInit {

  @Input() documentation : Documentation;
  @Input() documentationArea : DocumentationArea;

  public safeContent: SafeHtml;

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
      this.documentationArea = data.DocumentationArea || this.documentationArea;
      this.safeContent = this.domSanitizer.bypassSecurityTrustHtml(this.documentation.content);

      setTimeout(t => {
        window['removeAllListeners']("click");
      }, 1000);
    });
  }

  protected getPermissionService(): PermissionsService {
    return this.permissionsService;
  }
}
