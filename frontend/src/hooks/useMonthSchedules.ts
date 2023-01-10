import axios from "axios";
import { useState, useCallback } from "react";

import { MonthSchedule } from "../../types/shedule/monthShudele";

interface Props {
  year: string;
  month: string;
}

export const useAllUsers = () => {
  const [monthShedules, setMonthSchedules] = useState<MonthSchedule>();

  const getMonthSchedules = useCallback((props: Props) => {
    const { year, month } = props;
    // ここにaxiosを用いた月予定のデータ取得の処理を記述する
  }, []);
  return { getMonthSchedules, monthShedules };
};
