import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ScheduleFetchParams} from "../models/schedule-fetch-params.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleFetchService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getSchedule(params: ScheduleFetchParams) {
    return this.httpClient.get(`${this.apiUrl}/schedule?id=${params.id}&type=${params.type}&fromDate=${params.fromDate}&toDate=${params.toDate}`);
  }
}
