import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import UserUtils from "../utils/user-utils";
import {RequestOptions} from "../utils/utils";
import {userUrl} from "../utils/urls";
import Utils from "../utils/utils";

@Injectable()
export class AccountService {
  constructor(public http: HttpClient) {}

  retrieveAccount(id, token) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };
      const url = userUrl + 'users/' + id;

      this.http.get(url, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Error retrieving account, please try again");
        });
    });
  }

  updateUserDetails(data, token) {
      return new Promise((resolve, reject) => {
          if (!UserUtils.isValidUpdateUserDetails(data)) {
              reject(UserUtils.errorMessage);
              return
          }

          const headers = new HttpHeaders()
            .set("Content-Type", 'application/json')
            .set("X-Auth-Token", token)
            .set("Authorization", Utils.stripAuthToken(token));
          const options: RequestOptions = { headers: headers, observe: "response" };

          this.http.put(userUrl+'users', JSON.stringify(data), options)
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject("Error updating details, please try again");
            });
      });
  }

  updateUserPassword(data, token) {
    return new Promise((resolve, reject) => {
      if (!UserUtils.isValidUpdatePassword(data)) {
        reject(UserUtils.errorMessage);
        return
      }

      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      this.http.put(userUrl+'users/password', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Error updating password, please try again");
        });
    });
  }

  updateUserForAdFree(id, token, transactionId) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };
      const body = { transactionId: transactionId };
      const url = userUrl + 'users/' + id;

      this.http.put(url, body, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Error retrieving account, please try again");
        });
    });
  }

}
