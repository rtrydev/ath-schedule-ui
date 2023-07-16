import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {ScheduleDetails} from "../../models/schedule-details.model";
import {ScheduleItem} from "../../models/schedule-item.model";
import {ScheduleFetchService} from "../../services/schedule-fetch.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  closeDrawerIcon = faArrowLeft;
  openDrawerIcon = faArrowRight;
  closeDrawerIconMobile = faArrowUp;
  openDrawerIconMobile = faArrowDown;
  scheduleFormHidden = false;
  isMobile = true;
  schedule: ScheduleDetails[] = [];
  currentScheduleParams: ScheduleItem;
  currentWeek: number;

  constructor(private scheduleFetchService: ScheduleFetchService) {}

  ngOnInit(): void {
    this.isMobile = this.checkIsMobile();

    window.addEventListener('resize', () => {
      this.isMobile = this.checkIsMobile();
    });

    const lastParamString = localStorage.getItem('lastFetchedSchedule');

    if (lastParamString) {
      this.currentScheduleParams = JSON.parse(lastParamString);
      if (this.isMobile) {
        this.scheduleFormHidden = true;
      }
    }
  }

  scheduleBranchSubmitted(scheduleItem: ScheduleItem) {
    this.currentScheduleParams = scheduleItem;

    this.loadScheduleForCurrentParams();
  }

  dateChanged(weekStartTimestamp: number) {
    this.currentWeek = weekStartTimestamp;

    if (this.currentScheduleParams) {
      this.loadScheduleForCurrentParams();
    }
  }

  loadScheduleForCurrentParams() {
    const params = {
      id: this.currentScheduleParams.id,
      type: this.currentScheduleParams.type,
      week: this.currentWeek
    };

    this.scheduleFetchService.getSchedule(params).subscribe(scheduleResponse => {
      // @ts-ignore
      this.schedule = scheduleResponse.data as ScheduleDetails[];
    });
  }

  toggleScheduleForm() {
    this.scheduleFormHidden = !this.scheduleFormHidden;
  }

  getToggleIcon(isMobile: boolean) {
    if (isMobile) {
      return this.scheduleFormHidden ? this.openDrawerIconMobile : this.closeDrawerIconMobile;
    }
    return this.scheduleFormHidden ? this.openDrawerIcon : this.closeDrawerIcon;
  }

  private checkIsMobile() {
    return window.innerWidth < 768;
  }
}
