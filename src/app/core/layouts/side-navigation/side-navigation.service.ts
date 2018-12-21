import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavigationService {

  public $sideNavOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  public setSideNavOpenState (opened: boolean) : void {
    this.$sideNavOpened.next(opened);
  }

}
