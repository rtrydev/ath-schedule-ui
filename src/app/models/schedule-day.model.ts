import {ScheduleBlockItem} from "./schedule-block-item.model";

export interface ScheduleDay {
  dayName: string;
  scheduleBlockItems: ScheduleBlockItem[];
}
