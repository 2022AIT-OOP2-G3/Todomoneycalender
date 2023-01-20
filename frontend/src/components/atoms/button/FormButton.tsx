import { FC, memo, ReactNode } from "react";
import styled from "styled-components";

import { BaseButton } from "./BaseButton";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export const FormButton: FC<Props> = memo((props) => {
  const { onClick, disabled=false, children } = props;
  return (
    <SButton onClick={onClick} disabled={disabled}>
      {children}
    </SButton>
  );
});

const SButton = styled(BaseButton)`
  width: 100px;
  background-color: green;
`;
