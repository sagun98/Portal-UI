import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { ManageDocumentationAreaComponent } from '../../../documentation/manage-documentation-area/manage-documentation-area.component';

@Injectable({
  providedIn: 'root'
})
export class VerifyLeaveGuard implements CanDeactivate<ManageDocumentationAreaComponent> {

  canDeactivate(component: ManageDocumentationAreaComponent) {
    return component.showLeaveConfirmation();
  }

}