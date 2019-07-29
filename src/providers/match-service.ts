import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth-service";
import {RequestOptions} from "../utils/utils";
import {fixtureUrl, liveMatchUrl, predictionUrl} from "../utils/urls";
import Utils from "../utils/utils";

@Injectable()
export class MatchService {
  constructor(public http: HttpClient, public authService: AuthService) {
  }

  retrievePredictedMatches(token, id) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = predictionUrl + 'predictions/' + id;

      this.http.get(url, options).subscribe(res => {
          resolve(res);
        }, (err) => {
        console.log(err);
          reject(err);
        });
    });
  }

  savePredictions(token, predictions) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = predictionUrl + 'predictions';

      this.http.post(url, JSON.stringify(predictions), options).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  retrievePredictionSummary(token, id) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = predictionUrl + 'predictions/summary/' + id;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  retrieveMatches(token) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = fixtureUrl;

      this.http.get(url, options).subscribe(res => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  retrieveUpcomingMatches(token) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = liveMatchUrl + 'upcoming';

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Not used
  retrieveUpdatedMatchScore(token, matchId) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = fixtureUrl + 'fixtures/liveScore/' + matchId;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  //Not used
  retrieveMatchStats(token, matchId) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));
      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = liveMatchUrl + 'live/' + matchId;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  retrieveMatchSummary(token, matchId, userId) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders()
        .set("Content-Type", 'application/json')
        .set("X-Auth-Token", token)
        .set("Authorization", Utils.stripAuthToken(token));

      const options: RequestOptions = { headers: headers, observe: "response" };

      const url = liveMatchUrl + 'match/' + matchId + '/user/' + userId;

      this.http.get(url, options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }
}
