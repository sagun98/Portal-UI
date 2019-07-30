import { ApigeeSSLInfo } from './../../../../../../core/classes/apigee-sslinfo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApigeeTargetServer as IApigeeTargetServer } from 'src/app/core/interfaces/apigee-targetserver.interface';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'target-server-modal',
  templateUrl: './target-server-modal.component.html',
  styleUrls: ['./target-server-modal.component.scss']
})
export class TargetServerModalComponent implements OnInit {

  @Input() opened: boolean = false;
  @Input() targetServer: IApigeeTargetServer;
  @Output() onSave: EventEmitter<IApigeeTargetServer> = new EventEmitter<IApigeeTargetServer>();
  @Output() onCancel: EventEmitter<IApigeeTargetServer> = new EventEmitter<IApigeeTargetServer>();
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
    let targetServer: IApigeeTargetServer = this.form.getRawValue() as IApigeeTargetServer;

    if(this.form.controls.ssl.value)
      targetServer.sSLInfo = new ApigeeSSLInfo({});

    this.onSave.emit(targetServer);
    this.opened = false;
  }

  public handleCancel () : void {
    this.onCancel.emit(this.targetServer);
    this.opened = false;
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      host : [this.targetServer.host, [Validators.required, Validators.pattern(/^([A-Za-z0-9\-]+\.)+(com|net|org|gov|io)$/)]],
      port : [this.targetServer.port || 443, [Validators.required]],
      isEnabled : [this.targetServer.isEnabled, [Validators.required]],
      ssl : [null, [Validators.required]]
    });

    if (this.targetServer.isEnabled == null)
      this.form.controls.isEnabled.setValue(false, {emitEvent : false, selfOnly : true});
    
    this.setInitialSSL();

    this.handlePortSelection();
  }

  private setInitialSSL () : void {
    let initialSSL = (this.form.controls.port.value && this.form.controls.port.value === 443) ? true : false;
    this.form.controls.ssl.setValue(initialSSL);
  }

  private handlePortSelection() : void {
    this.form.controls.port.valueChanges.subscribe( port => {
      let ssl = (parseInt(port) === 443) ? true : false;
      this.form.controls.ssl.setValue(ssl);      
    })
  }
}
