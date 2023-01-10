import { Link } from "react-router-dom";
import { memo, useState, ChangeEvent, useCallback } from "react";

import { FormLayout } from "../templates/FormLayout";
import { FormButton } from "../atom/button/FormButton";
import { PrimaryInput } from "../atom/input/PrimaryInput";
import { useSignUpUser } from "../../hooks/auth/useSignUpUser";
import { PrimaryParagraph } from '../atom/text/PrimaryParagraph';

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
  }, [signUp]);

  return (
    <FormLayout>
      <PrimaryInput
        type="text"
        placeholder="email address"
        onChange={onChangeEmail}
      />
      <PrimaryInput
        type="password"
        placeholder="password"
        onChange={onChangePassword}
      />
      <PrimaryInput
        type="password"
        placeholder="confirmation password"
        onChange={onChangeConfirmationPassword}
      />
      <FormButton onClick={onClickSubmitForm}>サインイン</FormButton>
      <PrimaryParagraph>
        アカウントはすでにお持ちですか？<Link to="/">Sign In</Link>
      </PrimaryParagraph>
    </FormLayout>
  );
});
