import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertsComponent } from '../alerts/alerts.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {


  constructor(
    private bsModalService: BsModalService
  ) { }

  private showAlert(message: string, type: string){
    const bsModalRef: BsModalRef = this.bsModalService.show(AlertsComponent);
  //  bsModalRef.content.type = type;
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string) {
    this.showAlert(message, 'Danger');
  }

  showAlertDangerError(message: string, error: string) {
    this.showAlert(message, 'Danger' + error);
  }

  showAlertSucess(message: string) {
    this.showAlert(message, 'Success');
  }

  showAlertInfo(message: string) {
    this.showAlert(message, 'Info');
  }
}
