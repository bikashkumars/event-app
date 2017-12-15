import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://13.127.67.198/';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  registerUserByCode(empCode, empCodeType) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'query.php?name='+empCode+'&empType='+empCodeType).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
