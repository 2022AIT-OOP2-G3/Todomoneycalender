import { memo, ReactNode, FC } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

export const FormLayout: FC<Props> = memo((props) => {
  const { children } = props;

  return (
    <LoginPage>
      <Form>
        <form>{children}</form>
      </Form>
    </LoginPage>
  );
});

const LoginPage = styled.div`
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
`;

const Form = styled.div`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;
