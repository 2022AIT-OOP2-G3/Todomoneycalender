import { useCallback } from "react";
import axios from "axios";

import { auth } from "../../firebase/firebase";
import { PostSchedule } from "../../../../types/http/post/postSchedule";

interface Props {
  startingDateTime: string;
  endingDateTime: string;
  item: string;
  spendingAmount: number;
  incomeAmount: number;
}

export const usePostSchedule = () => {
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
    const userToken = localStorage.getItem('token');

    if (userToken) {
      axios
        .post<PostSchedule>("http://127.0.0.1:5000/schedule/", {
          uid: uid,
          startingDateTime,
          endingDateTime,
          item: item,
          spendingAmount: spendingAmount,
          incomeAmount: incomeAmount,
          headers: { Authorization: "JWT " + userToken }
        })
        .then(() => alert("登録完了しました"))
        .catch(() => alert("登録に失敗しました"));
    }
  }, []);
  return { postScheduleData };
};
