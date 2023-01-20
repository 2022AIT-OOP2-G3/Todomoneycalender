import axios from "axios";
import { useCallback } from "react";
import { auth } from "../../auth/firebase/firebase";

interface Props {
  spendingAmount: number;
}

export const useMoneyData = () => {
  const postMoneyData = useCallback((props: Props) => {
    const { spendingAmount } = props;
    const uid = auth.currentUser?.uid;

    if (uid === null) {
      alert("登録に失敗しました");
      return;
    }

    axios
      .post("/user", {
        uid: uid,
        spendingAmount: spendingAmount,
      })
      .then(() => alert("登録完了しました"))
      .catch(() => alert("登録に失敗しました"));
  }, []);
  return { postMoneyData };
};
