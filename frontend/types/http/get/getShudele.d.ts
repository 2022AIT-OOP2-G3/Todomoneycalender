import { GetDateSchedule } from "./getDateShudele";

export interface GetSchedule {
  date: string;
  incomeAmount: number;
  schedule: Array<GetDateSchedule>;
  usingAmount: number;
  spendingAmount: number;
}
