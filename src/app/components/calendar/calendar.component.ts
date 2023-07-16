import {Component, Input} from '@angular/core';
import {ScheduleDetails} from "../../models/schedule-details.model";
import {ScheduleDay} from "../../models/schedule-day.model";
import {ScheduleBlockItem} from "../../models/schedule-block-item.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() isMobile: boolean;
  @Input() set schedule(schedule: ScheduleDetails[]) {
    this.scheduleDays = this.parseSchedule(schedule);
  }
  hours: string[];
  scheduleDays: ScheduleDay[] = [];

  constructor() {
    this.hours = this.generateHours();
  }

  private generateHours() {
    const hours: string[] = [];

    for (let i = 8; i < 22; i++) {
      if (i > 9) {
        hours.push(`${i}:00`);
        continue;
      }

      hours.push(`0${i}:00`);
    }

    return hours;
  }

  private parseSchedule(schedule: ScheduleDetails[]) {
    if (schedule.length < 1 || !schedule[0].start_time) {
      return [];
    }

    const scheduleDate = new Date(schedule[0].start_time * 1000);

    const first = scheduleDate.getDate() - scheduleDate.getDay() + 1;
    const firstDay = new Date(scheduleDate.setDate(first));
    const weekStartDay = new Date(firstDay.setHours(1));

    const weekStart = weekStartDay.getTime() / 1000;

    const days = [];
    const dayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    for (let i = 0; i < 7; i++) {
      days.push({
        name: dayNames[i],
        start: weekStart + i * 60 * 60 * 24,
        end: weekStart + (i + 1) * 60 * 60 * 24
      })
    }

    const daysWithSchedule = days.filter(day =>
      !!schedule.find(scheduleItem => scheduleItem.start_time > day.start && scheduleItem.end_time < day.end)
    );

    const parsedSchedule = daysWithSchedule
      .map(day => {
        return {
          dayName: day.name,
          scheduleBlockItems: schedule
            .filter(scheduleItem => scheduleItem.start_time < day.end && scheduleItem.end_time > day.start)
            .map(scheduleItem => {
              return {
                name: scheduleItem.course,
                type: scheduleItem.type,
                speakers: scheduleItem.speakers,
                rooms: scheduleItem.rooms,
                startTime: scheduleItem.start_time,
                endTime: scheduleItem.end_time,
                minutesLength: (scheduleItem.end_time - scheduleItem.start_time) / 60
              };
            })
        }
    });

    const scheduleWithBreaks = parsedSchedule.map(scheduleItem => {
      const paddedSchedule: ScheduleBlockItem[] = [];

      for (let i = 0; i < scheduleItem.scheduleBlockItems.length; i++) {
        const itemDate = new Date(scheduleItem.scheduleBlockItems[0].startTime * 1000);
        const dayStart = new Date(itemDate.setHours(8, 0 ,0));

        if (i === 0) {
          const startTime = dayStart.getTime() / 1000;
          const endTime = scheduleItem.scheduleBlockItems[i].startTime;

          paddedSchedule.push({
            type: 'interval',
            speakers: [],
            rooms: [],
            startTime,
            endTime,
            minutesLength: (endTime - startTime) / 60
          });

          paddedSchedule.push(scheduleItem.scheduleBlockItems[i]);

          continue;
        }

        const startTime = scheduleItem.scheduleBlockItems[i - 1].endTime;
        const endTime = scheduleItem.scheduleBlockItems[i].startTime;

        paddedSchedule.push({
          type: 'interval',
          speakers: [],
          rooms: [],
          startTime,
          endTime,
          minutesLength: (endTime - startTime) / 60
        });

        paddedSchedule.push(scheduleItem.scheduleBlockItems[i]);
      }

      return {
        dayName: scheduleItem.dayName,
        scheduleBlockItems: paddedSchedule
      }
    });

    return scheduleWithBreaks;
  }
}
