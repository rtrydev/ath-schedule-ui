import {Component, Input} from '@angular/core';
import {ScheduleBlockItem} from "../../../models/schedule-block-item.model";

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent {
  @Input() day: string;
  @Input() isMobile: boolean;
  @Input() scheduleBlockItems: ScheduleBlockItem[];

  getTimeOnly(timestamp: number) {
    const date = new Date(timestamp * 1000);

    const hour = date.getHours();
    const minute = date.getMinutes();

    const formattedHour = hour > 9 ? `${hour}` : `0${hour}`;
    const formattedMinute = minute > 9 ? `${minute}` : `0${minute}`;

    return `${formattedHour}:${formattedMinute}`;
  }
}
