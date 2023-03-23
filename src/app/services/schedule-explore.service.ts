import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FeedItem} from "../models/feed-item.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleExploreService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getBaseBranch() {
    return this.httpClient.get(`${this.apiUrl}/branch-data`);
  }

  exploreBranch(feedItem: FeedItem) {
    return this.httpClient.get(`${this.apiUrl}/branch-data?type=${feedItem.type}&branch=${feedItem.branch}&link=${feedItem.link}`);
  }
}
