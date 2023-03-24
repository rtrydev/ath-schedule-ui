import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-calendar-entry',
  templateUrl: './calendar-entry.component.html',
  styleUrls: ['./calendar-entry.component.scss']
})
export class CalendarEntryComponent {
  @ViewChild('calEntry') calEntry: any;
  @ViewChild('calEntryText') calEntryText: any;
  @Input() name: string;
  @Input() type: string;
  @Input() speakers: string[];
  @Input() rooms: string[];
  @Input() time: string;
  @Input() minutesLength: number;
  @Input() width: number;
  unwrapped = false;

  showFull() {
    if(this.calEntryText.nativeElement.offsetHeight > this.calEntry.nativeElement.offsetHeight || this.unwrapped) {
      this.unwrapped = !this.unwrapped;
    }
  }
}
