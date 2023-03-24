export class ScheduleBlockItem {
  name?: string;
  type: string;
  speakers: string[] = [];
  rooms: string[] = [];
  startTime: number;
  endTime: number;
  minutesLength: number;
}
