import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-calendar-entry',
  templateUrl: './calendar-entry.component.html',
  styleUrls: ['./calendar-entry.component.scss']
})
export class CalendarEntryComponent {
  @Input() name: string;
  @Input() type: string;
  @Input() speakers: string[];
  @Input() rooms: string[];
  @Input() time: string;
  @Input() minutesLength: number;
  @Input() width: number;
}
