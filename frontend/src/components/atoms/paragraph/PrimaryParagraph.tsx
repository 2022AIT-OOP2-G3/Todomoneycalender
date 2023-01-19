import { memo, FC, ReactNode } from "react";
import styled from "styled-components";

import { BaseParagraph } from "./BaseParagraph";

interface Props {
  children: ReactNode;
}

export const PrimaryParagraph: FC<Props> = memo((props) => {
  const { children } = props;
  return <SParagraph>{children}</SParagraph>;
});

const SParagraph = styled(BaseParagraph)`
  margin-top: 10px;
`;
