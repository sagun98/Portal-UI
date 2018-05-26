import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // TODO: Add type
  public products: any[] = []

  constructor(
    public appService : AppService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.products = this.activatedRoute.snapshot.data.productData;
  }

}
