import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  hours: string[];

  constructor() {
    this.hours = this.generateHours();
  }

  private generateHours() {
    const hours: string[] = [];

    for (let i = 7; i < 22; i++) {
      if (i > 9) {
        hours.push(`${i}:00`);
        continue;
      }

      hours.push(`0${i}:00`);
    }

    return hours;
  }

}
