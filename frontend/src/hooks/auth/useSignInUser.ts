import { useCallback } from "react";

interface Props {
  email: string;
  password: string;
}

export const useSignInUser = () => {
  const signIn = useCallback((props: Props) => {
    const { email, password } = props;

    // ここにログイン処理を記述する
  }, []);

  return { signIn };
};
