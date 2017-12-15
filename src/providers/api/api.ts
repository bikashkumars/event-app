import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  apiUrl = 'http://13.127.67.198/';
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  registerByCode(empCode, empType) {
    return this.http.get(this.apiUrl + 'query.php?name='+empCode+'&empType='+empType);
  }

  checkBySignum(signum) {
    return this.http.get(this.apiUrl + 'validate.php?name='+signum);
  }

  registerBySignum(signum) {
    return this.http.get(this.apiUrl + 'signum.php?name='+signum);
  }

  getList() {
    return this.http.get(this.apiUrl + 'feed.php');
  }

}
