import { Schedule } from "../../../types/shedule/shudele";
import axios from "axios";
import { useState, useCallback } from "react";

interface Props {
  year: string;
  month: string;
}

export const useSchedules = () => {
  const [schedules, setSchedules] = useState(null);

  const getSchedules = useCallback(() => {
    // const { year, month } = props;
    axios
      .get("http://127.0.0.1:5000/schedule/test/2020/10")
      .then((res) => setSchedules(res.data))
      .catch(() => {
        // alert("スケジュール情報の取得に失敗しました");
      });
  }, []);
  return { getSchedules, schedules };
};
