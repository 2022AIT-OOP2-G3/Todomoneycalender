import axios from "axios";
import { useState, useCallback } from "react";

import { DateSchedule } from "./../../types/shedule/dateShudele.d";

interface Props {
  year: string;
  month: string;
  date: string;
}

export const useDateSchedules = () => {
  const [dateShedules, setDateSchedules] = useState<DateSchedule>();

  const getDateSchedules = useCallback((props: Props) => {
    const { year, month, date } = props;
    // ここにaxiosを用いた日にちごとの予定のデータ取得の処理を記述する
  }, []);
  return { getDateSchedules, dateShedules };
};
