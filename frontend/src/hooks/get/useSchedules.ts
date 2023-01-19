import { useState, useCallback } from "react";
import axios from "axios";

import { auth } from "../auth/firebase/firebase";
import { Schedule } from "../../../types/shedule/shudele";

interface Props {
  year: string;
  month: string;
}

export const useSchedules = () => {
  const [schedule, setSchedules] = useState<Schedule | null>(null);

  const getSchedules = useCallback(() => {
    // const { year, month } = props;
    const uid = auth.currentUser?.uid;
    axios
      .get<Schedule>(`http://127.0.0.1:5000/schedule/test/2020/10`)
      .then((res) => setSchedules(res.data))
      .catch(() => {
        // alert("スケジュール情報の取得に失敗しました");
      });
  }, []);
  return { getSchedules, schedule };
};
