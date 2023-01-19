import { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const ModalLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <Overlay>
      <ContentWrapper>{children}</ContentWrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: -100vh;
  left: -100vw;
  bottom: -100vh;
  right: -100vw;
  z-index: 3;
`;

const ContentWrapper = styled.div`
  background-color: white;
  padding: 40px;
  box-sizing: border-box;
  color: #333;
  min-height: 60vmin;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 80vmin;
  z-index: 2;
`;
