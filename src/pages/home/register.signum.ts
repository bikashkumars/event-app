import { Component } from '@angular/core';

import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';


@Component({
  selector:'register-signum-page',  
  template: `
    <form (ngSubmit)="registerForm()">
      <ion-item>
        <ion-label>Signum</ion-label>
        <ion-input [(ngModel)]="reg.signum" maxlength="7" name="signum"></ion-input>
      </ion-item>
      <button ion-button type="submit" block>Register</button>
    </form>
  `,
})
export class FormsSignumPage {
  reg = {signum:''}
  responseCode = {};
  responseMsg = {};
  responseName = '';
  
  constructor(private alertCtrl: AlertController, public apiProvider: ApiProvider, private spinnerDialog: SpinnerDialog, private toastCtrl: ToastController) {
    //this.reg.code = 'EGIL';  
  }

  presentConfirm(empName: string) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Name',
      message: empName,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Register',
          handler: () => {
            this.registerUserBySignum();
          }
        }
      ]
    });
    alert.present();
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


  checkUserBySignum(){
    this.spinnerDialog.show('Loading....', 'Please Wait');
    this.apiProvider.checkBySignum(this.reg.signum).subscribe(
      data => {
          
          this.responseCode =data['statusCode'];
          this.responseMsg =data['msg'];
          if(data['data'].length > 0){
            this.responseName = data['data'][0]['name'];
            this.presentConfirm(this.responseName);
          } else {
            this.errorToast("Employee Not Found");
          }  
      },
      err => {
          console.log(err);
      },
      () => this.spinnerDialog.hide()
    );
  }

  registerUserBySignum(){
    this.spinnerDialog.show('Loading....', 'Please Wait');
    this.apiProvider.registerBySignum(this.reg.signum).subscribe(
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



  registerForm() {
    if(this.reg.signum == '' ){
      this.errorToast("Enter Signum");
      return true;
    }

    this.checkUserBySignum();  

  }
}