import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit{
  @Output() currentWeekChanged = new EventEmitter<number>();
  currentOffset = 0;
  currentWeek: string;

  incrementIcon = faChevronCircleRight;
  decrementIcon = faChevronCircleLeft;

  ngOnInit() {
    this.setWeekString();

    const currentWeekTimestamp = this.getWeekStartTimestamp();
    this.currentWeekChanged.emit(currentWeekTimestamp);
  }

  incrementOffset() {
    this.currentOffset++;
    this.setWeekString();

    const currentWeekTimestamp = this.getWeekStartTimestamp();
    this.currentWeekChanged.emit(currentWeekTimestamp);
  }

  decrementOffset() {
    this.currentOffset--;
    this.setWeekString();

    const currentWeekTimestamp = this.getWeekStartTimestamp();
    this.currentWeekChanged.emit(currentWeekTimestamp);
  }

  private getWeekStartTimestamp() {
    const currentDate = new Date();

    const first = currentDate.getDate() - currentDate.getDay() + 1 + 7 * this.currentOffset;
    const firstDay = new Date(currentDate.setDate(first));

    return firstDay.getTime() / 1000;
  }

  private setWeekString() {
    const currentDate = new Date();

    const first = currentDate.getDate() - currentDate.getDay() + 1 + 7 * this.currentOffset;
    const last = first + 6;

    const firstDay = new Date(currentDate.setDate(first));
    const lastDay = new Date(currentDate.setDate(last));

    const currentDates = [firstDay, lastDay]
      .map(date =>
        `${this.getFormattedNumber(date.getDate())}/${this.getFormattedNumber(date.getMonth() + 1)}/${date.getFullYear()}`
      );

    this.currentWeek = `${currentDates[0]} - ${currentDates[1]}`
  }

  private getFormattedNumber(dateNumber: number) {
    return dateNumber < 10 ? `0${dateNumber}` : `${dateNumber}`;
  }
}
