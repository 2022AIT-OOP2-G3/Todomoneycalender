import { Link } from "react-router-dom";
import { ChangeEvent, memo, useState, useCallback } from "react";

import { FormLayout } from "../templates/FormLayout";
import { FormInput } from "../atoms/input/FormInput";
import { FormButton } from "../atoms/button/FormButton";
import { PrimaryParagraph } from "../atoms/paragraph/PrimaryParagraph";
import { useSignUpUser } from "../../hooks/firebase/auth/useSignUpUser";

export const SignUp = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const { signUp } = useSignUpUser();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangeConfirmationPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmationPassword(e.target.value);

  const onClickSubmitForm = useCallback(() => {
    signUp({
      email: email,
      password: password,
      confirmationPassword: confirmationPassword,
    });
  }, [signUp, email, password, confirmationPassword]);

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
      <FormInput
        type="password"
        value={confirmationPassword}
        placeholder="confirmation password"
        onChange={onChangeConfirmationPassword}
      />
      <FormButton
        onClick={onClickSubmitForm}
        disabled={
          email === "" || password === "" || confirmationPassword === ""
        }
      >
        サインアップ
      </FormButton>
      <PrimaryParagraph>
        アカウントはすでにお持ちですか？<Link to="/">Sign In</Link>
      </PrimaryParagraph>
    </FormLayout>
  );
});
