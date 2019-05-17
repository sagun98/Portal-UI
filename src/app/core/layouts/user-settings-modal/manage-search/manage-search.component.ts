import { SearchService } from './../../../services/search-service/search.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage-search',
  templateUrl: './manage-search.component.html',
  styleUrls: ['./manage-search.component.scss']
})
export class ManageSearchComponent implements OnInit {

  constructor(
    public searchService : SearchService,
    public toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  public reindex () {
    this.searchService.reindex().subscribe(
      response => {
        this.toastrService.success('All APIs, Collections, and Documentation has been reindexed');
      },
      error => {
        this.toastrService.error('Search Reindexing Failed');
      }
    );
  }

}
