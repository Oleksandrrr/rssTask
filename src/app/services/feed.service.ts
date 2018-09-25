import { Feed } from './../models/feed';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }
  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';
  private rssToJsonApiKey:string = '&api_key=pusvyvdzd4gwauygnjaposz0vptecbcrssnca07s&count=30';
  getFeedContent(url: string): Observable<Feed> {
    // return this.http.get(this.rssToJsonServiceBaseUrl + url + this.rssToJsonApiKey)
    return this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=${url}&api_key=pusvyvdzd4gwauygnjaposz0vptecbcrssnca07s&count=30`)
      .pipe(map(this.extractFeeds))
      ;
  }

  private extractFeeds(res: Response): any {
    // let feed = res.json();
    return res;
  }

  private handleError(error: any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
