import { useCallback } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"

interface Props {
  email: string;
  password: string;
  confirmationPassword: string;
}

export const useSignUpUser = () => {
  const signUp = useCallback((props: Props) => {
    const { email, password, confirmationPassword } = props;

    // パスワードと再入力されたパスワードが違う場合
    if (password !== confirmationPassword) alert("パスワードが一致しません");

    // 登録
    try {
      createUserWithEmailAndPassword(auth, email, password );
    } catch(error) {
      alert("正しく入力してください");
    }

  }, []);

  return { signUp };
};
