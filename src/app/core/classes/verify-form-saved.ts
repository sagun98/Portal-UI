import { FormGroup } from '@angular/forms';

export abstract class VerifyFormSavedComponent {
    public submitted: boolean = false;
    public form: FormGroup;

    public showLeaveConfirmation () : boolean {
        if(! this.submitted && this.form.dirty){
            let leaveScreen = confirm('Are you sure you want to leave this page?  All unsaved changes will be lost');

            if(leaveScreen)
                return true;

            return false;
        }
        return true;
    }
}