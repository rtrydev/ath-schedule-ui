import { Component } from '@angular/core';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  closeDrawerIcon = faArrowLeft;
  openDrawerIcon = faArrowRight;
  scheduleFormHidden = false;
  toggleScheduleForm() {
    this.scheduleFormHidden = !this.scheduleFormHidden;
  }
}
