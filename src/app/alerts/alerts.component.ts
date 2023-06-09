import { Component,  OnInit, Input  } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit  {

  @Input() message?: string;
  @Input() type: string = 'success';

  constructor(
    public modal: BsModalRef
  ) {}

  ngOnInit() {
  }

  onClose() {
    this.modal.hide();
  }
}
