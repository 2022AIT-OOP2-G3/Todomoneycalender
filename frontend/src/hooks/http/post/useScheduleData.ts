import { useCallback } from "react";
import axios from "axios";
import { auth } from "../../auth/firebase/firebase";

interface Props {
  startingDateTime: string;
  endingDateTime: string;
  item: string;
  spendingAmount: number;
  incomeAmount: number;
}

export const useScheduleData = () => {
  const postScheduleData = useCallback((props: Props) => {
    const {
      startingDateTime,
      endingDateTime,
      item,
      spendingAmount,
      incomeAmount,
    } = props;

    const uid = auth.currentUser?.uid;

    if (uid === null) {
      alert("登録に失敗しました");
      return;
    }

    axios
      .post("http://127.0.0.1:5000/schedule/", {
        uid: uid,
        startingDateTime,
        endingDateTime,
        // startingDay: startingDay,
        // endingDay: endingDay,
        // startingTime: startingTime,
        // endingTime: endingTime,
        item: item,
        spendingAmount: spendingAmount,
        incomeAmount: incomeAmount,
      })
      .then(() => alert("登録完了しました"))
      .catch(() => alert("登録に失敗しました"));
  }, []);
  return { postScheduleData };
};
