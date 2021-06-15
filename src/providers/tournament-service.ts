import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {RequestOptions} from "../utils/utils";
import {apiUrl, coreUrl} from "../utils/urls";
import Utils from "../utils/utils";

@Injectable()
export class TournamentService {
  constructor(public http: HttpClient, public authService: AuthService) {
  }

  retrieveCurrentLeagueTable(token) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = coreUrl + 'leagueTable/current';

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  retrievePredictedLeagueTable(token, id) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = coreUrl + 'leagueTable/predicted/' + id;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
