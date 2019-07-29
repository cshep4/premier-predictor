import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth-service";
import {Injectable} from "@angular/core";
import Utils, {RequestOptions} from "../utils/utils";
import {leagueUrl} from "../utils/urls";

@Injectable()
export class StandingsService {
  constructor(public http: HttpClient, public authService: AuthService) {
  }

  retrieveUserLeagues(token, id) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = leagueUrl + id;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addLeague(token, id, name) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = leagueUrl;// + 'standings/add';
      const body = {
        name: name,
        id: id
      };

      this.http.post(url, body, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  joinLeague(token, id, pin) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = leagueUrl + 'join';
      const body = {
        pin: Number(pin),
        id: id
      };

      this.http.put(url, body, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  leaveLeague(token, id, pin) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = leagueUrl + 'leave';
      const body = {
        pin: Number(pin),
        id: id
      };

      this.http.put(url, body, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  getLeagueTable(token, pin) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      let url;
      if (pin) {
        url = leagueUrl + 'standings/' + pin;
      } else {
        url = leagueUrl + 'standings';
      }

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  renameLeague(token, pin, name) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = leagueUrl + 'rename';
      const body = {
        pin: Number(pin),
        name: name
      };

      this.http.put(url, body, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
