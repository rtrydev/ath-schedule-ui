import {Component, OnInit} from '@angular/core';
import {faArrowDown, faArrowLeft, faArrowRight, faArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit{
  closeDrawerIcon = faArrowLeft;
  openDrawerIcon = faArrowRight;
  closeDrawerIconMobile = faArrowUp;
  openDrawerIconMobile = faArrowDown;
  scheduleFormHidden = false;
  isMobile = true;

  ngOnInit(): void {
    this.isMobile = this.checkIsMobile();

    window.addEventListener('resize', () => {
      this.isMobile = this.checkIsMobile();
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
