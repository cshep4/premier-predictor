import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {RequestOptions} from "../utils/utils";
import {LoginPage} from "../pages/login/login";
import {App} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {userUrl} from "../utils/urls";
import Utils from "../utils/utils";

@Injectable()
export class ScoreService {
  constructor(public http: HttpClient,
              public authService: AuthService,
              private app: App,
              private storage: Storage) {
  }

  //TODO - hard-coded rank
  retrieveScoreAndRank(token, id) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = userUrl + 'users/score/' + id;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          this.logout();
        }
        reject(err);
      });
    });
  }

  private logout() {
    this.storage.clear();
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }
}
