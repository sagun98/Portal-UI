import { HttpErrorMessage } from './core/interfaces/http-error.interface';
import { Component, OnInit } from '@angular/core';
import { ErrorInterceptor } from './core/interceptors/errors.interceptor';
import { HttpErrorsService } from './core/services/http-errors/http-errors.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private httpErrorsServices : HttpErrorsService,
    private toastrService : ToastrService
  ){
    
  }

  ngOnInit(){
    this.httpErrorsServices.$onError.subscribe( (errors: HttpErrorMessage[]) => {
      errors.forEach( (error: HttpErrorMessage) => {
        this.toastrService[error.type ](error.title, error.message);
      });
    });
  }

}
