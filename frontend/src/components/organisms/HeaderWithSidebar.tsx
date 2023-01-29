import { memo, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

import { IconButton } from "../atoms/button/IconButton";
import { SideBarContent } from "../molecules/sidebar/SideBarContent";
import { LouOutButton } from "../atoms/button/LouOutButton";
import { useSignOutUser } from "../../hooks/firebase/auth/useSignOutUser";

export const HeaderWithSidebar: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(true);
  const { logOut } = useSignOutUser();

  const onClickIsOpen = () => setIsOpen(!isOpen);
  const onClickSignOut = useCallback(() => {
    logOut();
  }, [logOut]);

  return (
    <>
      <SHeader>
        <IconButton onClick={onClickIsOpen}>
          <FiMenu color="black" size={20} />
        </IconButton>
        <SA>カレンダー</SA>
        <SDiv>
          <LouOutButton onClick={onClickSignOut}>ログアウト</LouOutButton>
        </SDiv>
      </SHeader>
      {isOpen && <SideBarContent />}
    </>
  );
});

const SHeader = styled.header`
  height: 40px;
  width: 100%;
  padding: 15px 0;
  display: flex;
  position: relative;
  color: black;
  background-color: white;
  border-bottom: 1px solid #dcdcdc;
`;

const SA = styled.a`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const SDiv = styled.div`
  margin-left: auto;
`;
