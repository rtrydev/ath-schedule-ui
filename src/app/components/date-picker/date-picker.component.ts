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

  weekOffset = 2164;
  currentMagicWeek: number;

  incrementIcon = faChevronCircleRight;
  decrementIcon = faChevronCircleLeft;

  ngOnInit() {
    const currentWeek = this.getCurrentWeek();

    this.currentMagicWeek = this.getMagicWeek(currentWeek);
    this.setWeekString();

    this.currentWeekChanged.emit(this.currentMagicWeek);
  }

  incrementOffset() {
    this.currentOffset++;
    this.setWeekString();

    this.currentWeekChanged.emit(this.currentMagicWeek + this.currentOffset);
  }

  decrementOffset() {
    this.currentOffset--;
    this.setWeekString();

    this.currentWeekChanged.emit(this.currentMagicWeek + this.currentOffset);
  }

  private setWeekString() {
    const currentDate = new Date();

    const first = currentDate.getDate() - (currentDate.getDay() + 6) % 7 + 7 * this.currentOffset;
    const last = first + 6;

    const firstDay = new Date(new Date().setDate(first));
    const lastDay = new Date(new Date().setDate(last));

    const currentDates = [firstDay, lastDay]
      .map(date =>
        `${this.getFormattedNumber(date.getDate())}/${this.getFormattedNumber(date.getMonth() + 1)}/${date.getFullYear()}`
      );

    this.currentWeek = `${currentDates[0]} - ${currentDates[1]}`
  }

  private getFormattedNumber(dateNumber: number) {
    return dateNumber < 10 ? `0${dateNumber}` : `${dateNumber}`;
  }

  private getCurrentWeek() {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);

    // @ts-ignore
    const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    return Math.ceil(days / 7);
  }

  private getMagicWeek(actualWeek: number) {
    const currentYear = new Date().getFullYear();

    return actualWeek + 52 * (currentYear - 1970) - this.weekOffset;
  }
}
