import { Page404 } from "../components/pages/Page404";
import { MonthyCalender } from "../components/pages/MonthlyCalender";
import { WeeklyCalender } from "../components/pages/WeeklyCalender";
import { DayCalender } from "../components/pages/DayCalender";

export const userRoutes = [
  {
    path: "monthy",
    children: <MonthyCalender />,
  },
  {
    path: "weekly",
    children: <WeeklyCalender />,
  },
  {
    path: "day",
    children: <DayCalender />,
  },
  {
    path: "*",
    children: <Page404 />,
  },
];
