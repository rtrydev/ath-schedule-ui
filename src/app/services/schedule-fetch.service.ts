import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ScheduleFetchParams} from "../models/schedule-fetch-params.model";
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFetchService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getSchedule(params: ScheduleFetchParams) {
    return this.httpClient.get(`${this.apiUrl}/schedules/${params.id}?week=${params.week}`)
      .pipe(
        catchError(err => {
          if (err.status !== 404) {
            return of({
              data: []
            });
          }

          return this.httpClient.post(`${this.apiUrl}/schedules`, {
            schedule_id: params.id,
            schedule_type: params.type,
            week: params.week
          });
        }),
        catchError(err => {
          return of({
            data: []
          })
        })
      )
  }
}
