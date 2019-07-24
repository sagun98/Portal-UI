import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApigeeTargetServer } from 'src/app/core/interfaces/apigee-targetserver.interface';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'target-server-modal',
  templateUrl: './target-server-modal.component.html',
  styleUrls: ['./target-server-modal.component.scss']
})
export class TargetServerModalComponent implements OnInit {

  @Input() opened: boolean = false;
  @Input() targetServer: ApigeeTargetServer;
  @Output() onSave: EventEmitter<ApigeeTargetServer> = new EventEmitter<ApigeeTargetServer>();
  @Output() onCancel: EventEmitter<ApigeeTargetServer> = new EventEmitter<ApigeeTargetServer>();
  @ViewChild(ClrModal) clrModal: ClrModal;

  public form : FormGroup;

  constructor(
    private formBuilder : FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();

    setTimeout(t=> {
      document.getElementById("target-server-name").focus();
    }, 500);

  }

  public handleSubmit () : void {
    this.onSave.emit(this.form.getRawValue() as ApigeeTargetServer);
    this.opened = false;
  }

  public handleCancel () : void {
    this.onCancel.emit(this.targetServer);
    this.opened = false;
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      host : [this.targetServer.host, [Validators.required]],
      port : [this.targetServer.port || 443, [Validators.required]],
      isEnabled : [this.targetServer.isEnabled, [Validators.required]]
    });
  }

}
