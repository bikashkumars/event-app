import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
  selector:'register-page',  
  template: `
    <form (ngSubmit)="registerForm()">
        <ion-list radio-group [(ngModel)]="reg.type" name="type">
        <ion-item>
            <ion-label>EGIL</ion-label>
            <ion-radio value="EGIL" checked></ion-radio>
        </ion-item>
        <ion-item>
            <ion-label>EGIC</ion-label>
            <ion-radio value="EGIC"></ion-radio>
        </ion-item>
        </ion-list>

      <ion-item>
        <ion-label>Code</ion-label>
        <ion-input [(ngModel)]="reg.code" type="number" maxlength="7" name="code"></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Register</button>
    </form>
  `,
})
export class FormsPage {
  reg = {code:'', type:''}
  regResponse: Observable<any>;
  responseCode = {};
  responseMsg = {};

  constructor(public apiProvider: ApiProvider, private spinnerDialog: SpinnerDialog, private toastCtrl: ToastController) {
    
  }

  successToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass:'toast-success'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  errorToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass:'toast-danger'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }



  registerForm() {
    if(this.reg.code == '' || this.reg.type == ''){
      this.errorToast("Select EGIL/EGIC with Employee Code");
      return true;
    }

    this.spinnerDialog.show('Loading....', 'Please Wait');
    this.apiProvider.registerByCode(this.reg.code, this.reg.type).subscribe(
      data => {
          
          this.responseCode =data['statusCode'];
          this.responseMsg =data;
          console.log(this.responseCode);

          if(this.responseCode == '404'){
            this.errorToast("Not Available");
          } else if(this.responseCode == '405'){
            this.errorToast("Already Registered");
          } else if(this.responseCode == '200') {
            this.successToast("Registered Successfully");
          } else  {
            this.errorToast("Server Error");
          }

      },
      err => {
          console.log(err);
      },
      () => this.spinnerDialog.hide()
  );
  }
}