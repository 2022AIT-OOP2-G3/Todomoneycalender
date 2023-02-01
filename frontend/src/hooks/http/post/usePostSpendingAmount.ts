import { useCallback } from "react";
import axios from "axios";

import { auth } from "../../firebase/firebase";
import { PostSpendingAmount } from "../../../../types/http/post/postSpendingAmount";

interface Props {
  spendingAmount: number;
  date: string | undefined;
}

export const usePostSpendingAmount = () => {
  const postSpendingAmount = useCallback((props: Props) => {
    const { spendingAmount, date } = props;
    const uid = auth.currentUser?.uid;

    if (uid === null) {
      alert("登録に失敗しました");
      return;
    }
    const userToken = localStorage.getItem('token');

    if (userToken) {
      axios
        .post<PostSpendingAmount>("http://127.0.0.1:5000/payment/", {
          uid: uid,
          spendingAmount: spendingAmount,
          date: date,
          headers: { Authorization: "JWT " + userToken }
        })
        .then(() => alert("登録完了しました"))
        .catch(() => alert("登録に失敗しました"));
    }
  }, []);
  return { postSpendingAmount };
};
