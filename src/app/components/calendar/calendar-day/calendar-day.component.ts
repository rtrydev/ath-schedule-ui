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
}
