import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DocumentationService } from '../../../../documentation';

@Component({
  selector: 'admin-manage-documentation',
  templateUrl: './admin-manage-documentation.component.html',
  styleUrls: ['./admin-manage-documentation.component.scss']
})
export class AdminManageDocumentationComponent implements OnInit {

  constructor(
    private documentationService: DocumentationService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  public doReorder () : void {
    this.documentationService.reorderDocumentation().subscribe(
      response => {
        this.toastrService.success('The Documentation area has been successfully reordered.');
      },

      errorResponse => {
        this.toastrService.error('The reordering of the Documentation area failed.  Please check the logs for errors.');
      }
    );
  }

}
