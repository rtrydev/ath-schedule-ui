import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FeedItem} from "../models/feed-item.model";
import { catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleExploreService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getBaseBranch() {
    return this.httpClient.get<any>(`${this.apiUrl}/branches/base`)
      .pipe(
        catchError(err => {
          if (err.status !== 404) {
            return of({
              data: []
            });
          }

          return this.httpClient.post(`${this.apiUrl}/branches`, {
            branch_id: 'base',
            branch_type: 0,
            branch_link: 0
          });
        }),
        catchError(err => {
          return of({
            data: []
          })
        })
      );
  }

  exploreBranch(feedItem: FeedItem) {
    return this.httpClient.get<any>(`${this.apiUrl}/branches/${feedItem.branch}`)
      .pipe(
        catchError(err => {
          if (err.status !== 404) {
            return of({
              data: []
            });
          }

          return this.httpClient.post(`${this.apiUrl}/branches`, {
            branch_id: feedItem.branch,
            branch_type: feedItem.type,
            branch_link: feedItem.link
          });
        }),
        catchError(err => {
          return of({
            data: []
          })
        })
      );
  }
}
