import { memo, useState } from "react";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";

import { PrimaryButton } from "../atom/button/PrimaryButton";
import { SideBarContent } from "../molecules/sidebar/SideBarContent";

// デモデータ
const Schedules = [
  { title: "バイト" },
  { title: "飲み会" },
  { title: "ライブ" },
];

export const HeaderWithSidebar = memo(() => {
  const [isOpen, setIsOpen] = useState(true);

  const onClickIsOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <SHeader>
        <PrimaryButton onClick={onClickIsOpen}>
          <FiMenu color="black" size={20} />
        </PrimaryButton>
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
