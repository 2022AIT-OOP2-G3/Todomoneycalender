import { useState, useCallback } from "react";
import axios from "axios";

import { auth } from "../../firebase/firebase";
import { GetSchedule } from "../../../../types/http/get/getShudele"; 

interface Props {
  year: string;
  month: string;
}

export const useGetSchedule = () => {
  const [schedule, setSchedules] = useState<GetSchedule | null>(null);

  const getSchedules = useCallback((props: Props) => {
    const { year, month } = props;
    const uid = auth.currentUser?.uid;
    const userToken = auth.currentUser?.getIdToken;

    axios
      .get<GetSchedule>(`http://127.0.0.1:5000/schedule/${uid}/${year}/${month}`, { headers: { Authorization: "JWT " + userToken}})
      .then((res) => setSchedules(res.data))
      .catch(() => {
        // alert("スケジュール情報の取得に失敗しました");
      });
  }, []);
  return { getSchedules, schedule };
};
