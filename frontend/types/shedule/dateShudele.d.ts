import { DateInput } from "@fullcalendar/core";

export interface DateSchedule {
  date: string;
  startingDate: string;
  endingDate: string;
  startingTime: string;
  endingTime: string;
  item: string;
  spendingAmount: number;
}
