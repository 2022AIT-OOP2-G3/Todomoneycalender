import { DateSchedule } from "./dateShudele.d";

export interface MonthSchedule {
  date: string;
  spendingAmount: number;
  usingAmount: number;
  incomeAmount: number;
  schedule: Array<DateSchedule>;
}
