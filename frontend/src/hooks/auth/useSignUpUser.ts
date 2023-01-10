import { useCallback } from "react";

interface Props {
  email: string;
  password: string;
  confirmationPassword: string;
}

export const useSignUpUser = () => {
  const signUp = useCallback((props: Props) => {
    const { email, password, confirmationPassword } = props;

    if (password !== confirmationPassword) return;

    // ここに新規登録の処理を記述する
  }, []);

  return { signUp };
};
