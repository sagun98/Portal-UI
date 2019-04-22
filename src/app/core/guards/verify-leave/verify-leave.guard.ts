import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { VerifyLeaveComponent } from '../../interfaces/verify-leave-component.interface';


@Injectable({
  providedIn: 'root'
})
export class VerifyLeaveGuard implements CanDeactivate<VerifyLeaveComponent> {

  canDeactivate(component: VerifyLeaveComponent) {
    return component.showLeaveConfirmation();
  }

}