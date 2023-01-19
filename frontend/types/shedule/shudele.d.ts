import { DateSchedule } from "./dateShudele";

export interface Schedule {
  date: string;
  incomeAmount: number;
  schedule: Array<DateSchedule>;
  usingAmount: number;
  spendingAmount: number;
}
