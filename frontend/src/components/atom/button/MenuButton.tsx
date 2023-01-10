import { memo, ReactNode, FC } from "react";
import styled from "styled-components";

import { BaseButton } from "./BaseButton";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export const MenuButton: FC<Props> = memo((props) => {
  const { onClick, children } = props;
  return <SButton onClick={onClick}>{children}</SButton>;
});

const SButton = styled(BaseButton)`
  background-color: white;
`;
