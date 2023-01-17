import axios from "axios";
import { useCallback } from "react";

interface Props {
  uid: string;
  spendingAmount: number;
}

export const useMoneyData = () => {
  const postMoneyData = useCallback((props: Props) => {
    const { uid, spendingAmount } = props;

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
