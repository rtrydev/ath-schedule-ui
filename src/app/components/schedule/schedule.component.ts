import { Component } from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  closeDrawerIcon = faArrowLeft;
  openDrawerIcon = faArrowRight;
  closeDrawerIconMobile = faArrowUp;
  openDrawerIconMobile = faArrowDown;
  scheduleFormHidden = false;
  toggleScheduleForm() {
    this.scheduleFormHidden = !this.scheduleFormHidden;
  }

  getToggleIcon() {
    if (window.innerWidth < 768) {
      return this.scheduleFormHidden ? this.openDrawerIconMobile : this.closeDrawerIconMobile;
    }
    return this.scheduleFormHidden ? this.openDrawerIcon : this.closeDrawerIcon;
  }
}
