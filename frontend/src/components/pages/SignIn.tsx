import { Link } from "react-router-dom";
import { ChangeEvent, memo, useState, useCallback } from "react";

import { FormLayout } from "../templates/FormLayout";
import { FormButton } from "../atoms/button/FormButton";
import { FormInput } from "../atoms/input/FormInput";
import { useSignInUser } from "../../hooks/firebase/auth/useSignInUser";
import { PrimaryParagraph } from "../atoms/paragraph/PrimaryParagraph";


export const SignIn = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useSignInUser();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onClickSignIn = useCallback(() => {
    signIn({ email: email, password: password });
  }, [signIn, email, password]);

  return (
    <FormLayout>
      <FormInput
        type="text"
        value={email}
        placeholder="email address"
        onChange={onChangeEmail}
      />
      <FormInput
        type="password"
        value={password}
        placeholder="password"
        onChange={onChangePassword}
      />
      <FormButton
        onClick={onClickSignIn}
        disabled={email === "" || password === ""}
      >
        サインイン
      </FormButton>
      <PrimaryParagraph>
        新規登録はお済みですか？
        <Link to="signup">Sign Up</Link>
      </PrimaryParagraph>
    </FormLayout>
  );
});
