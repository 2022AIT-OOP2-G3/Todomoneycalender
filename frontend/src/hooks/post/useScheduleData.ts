import { useCallback } from "react";
import axios from "axios";

interface Props {
  uid: string;
  startingDay: string;
  endingDay: string;
  startingTime: string;
  endingTime: string;
  item: string;
  spendingAmount: number;
  incomeAmount: number;
}

export const useScheduleData = () => {
  const postScheduleData = useCallback((props: Props) => {
    const {
      uid,
      startingDay,
      endingDay,
      startingTime,
      endingTime,
      item,
      spendingAmount,
      incomeAmount,
    } = props;

    axios
      .post("http://127.0.0.1:5000/schedule/", {
        uid: uid,
        startingDay: startingDay,
        endingDay: endingDay,
        startingTime: startingTime,
        endingTime: endingTime,
        item: item,
        spendingAmount: spendingAmount,
        incomeAmount: incomeAmount,
      })
      .then(() => alert("登録完了しました"))
      .catch(() => alert("登録に失敗しました"));
  }, []);
  return { postScheduleData };
};
