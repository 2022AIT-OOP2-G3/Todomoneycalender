import { memo, useState, FC } from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";

import { IconButton } from "../atoms/button/IconButton";
import { SideBarContent } from "../molecules/sidebar/SideBarContent";

export const HeaderWithSidebar: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(true);

  const onClickIsOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <SHeader>
        <IconButton onClick={onClickIsOpen}>
          <FiMenu color="black" size={20} />
        </IconButton>
        <SA>カレンダー</SA>
      </SHeader>
      {isOpen && <SideBarContent />}
    </>
  );
});

const SHeader = styled.header`
  height: 40px;
  width: 100%;
  padding: 15px 0;
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
