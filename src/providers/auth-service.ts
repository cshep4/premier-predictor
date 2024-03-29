import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import UserUtils from "../utils/user-utils";
import {RequestOptions} from "../utils/utils";
import {coreUrl, legacyUrl, userUrl} from "../utils/urls";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

  login(credentials) {
    return new Promise((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", 'application/json');
        const options: RequestOptions = { headers: headers, observe: "response" };

      this.http.post(coreUrl + 'login', JSON.stringify(credentials), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          this.http.post(legacyUrl+'login', JSON.stringify(credentials), options)
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
    });
  }

  storeLegacyUser(user) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders().set("Content-Type", 'application/json');
      const options: RequestOptions = { headers: headers, observe: "response" };

      this.http.post(userUrl + 'legacy', JSON.stringify(user), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
      return new Promise((resolve, reject) => {
          if (!UserUtils.isValidRegistrationDetails(data)) {
              reject(UserUtils.errorMessage);
              return
          }

          const headers = new HttpHeaders().set("Content-Type", 'application/json');
          const options: RequestOptions = { headers: headers, observe: "response" };

          this.http.post(coreUrl+'users/sign-up', JSON.stringify(data), options)
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject("Error registering, please try again");
            });
      });
  }

  logout(token){
      return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set('X-Auth-Token', token);
            const options: RequestOptions = { headers: headers, observe: "response" };
            this.http.post(coreUrl+'users/logout', {}, options)
              .subscribe(res => {
                  resolve(res);
              }, (err) => {
                  reject(err);
              });
      });
  }

  resetPassword(email){
    return new Promise((resolve, reject) => {
      if (!UserUtils.isValidEmail(email)) {
        reject(UserUtils.errorMessage);
        return
      }

      const headers = new HttpHeaders().set("Content-Type", 'application/json');
      const options: RequestOptions = { headers: headers, observe: "response" };
      this.http.post(coreUrl+'users/sendResetPassword', email, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject("Error resetting password, please try again");
        });
    });
  }

  setUsedToken(token) {
    return new Promise((resolve, reject) => {
      const body = token;
      const options: RequestOptions = { observe: "response" };

      this.http.put(coreUrl+'token/used', body, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
