import { memo, useState, FC } from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";

import { MenuButton } from "../atom/button/MenuButton";
import { SideBarContent } from "../molecules/sidebar/SideBarContent";

// デモデータ
const Schedules = [
  { color: "red", title: "バイト" },
  { color: "blue", title: "飲み会" },
  { color: "green", title: "ライブ" },
];

export const HeaderWithSidebar: FC = memo(() => {
  const [isOpen, setIsOpen] = useState(true);

  const onClickIsOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <SHeader>
        <MenuButton onClick={onClickIsOpen}>
          <FiMenu color="black" size={20} />
        </MenuButton>
        <SA>カレンダー</SA>
      </SHeader>
      {isOpen && <SideBarContent schedules={Schedules} />}
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
