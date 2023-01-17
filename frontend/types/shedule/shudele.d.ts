import { DateSchedule } from "./dateShudele";

export interface Schedule {
  date: string;
  incomeAmount: number;
  schedule: Array<DateSchedule>;
  spendingAmount: number;
  usingAmount: number;
}
