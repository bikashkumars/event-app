import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiProvider } from './../../providers/api/api';
import { Observable } from 'rxjs/Observable';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  responseData = {};
  
    constructor(public navCtrl: NavController, public apiProvider: ApiProvider, private spinnerDialog: SpinnerDialog, private toastCtrl: ToastController) {
      
    }
    ngOnInit() {
      this.getList();
    }
    
    doRefresh(refresher){
      this.getList();
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 1000);
    }

    getList() {
      this.apiProvider.getList().subscribe(
        data => {
            this.responseData =data;
        },
        err => {
            console.log(err);
        }
      );
    }

}
