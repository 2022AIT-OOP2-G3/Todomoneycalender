import { FC } from "react";
import styled from "styled-components";

import { FiPlus } from "react-icons/fi";

export const SideBarContent: FC = () => {
  return (
    <SUl>
      <p>今月の予算：円</p>
      <p>今月の収支：円</p>
      <p>今月の支出：円</p>
      <p>今月の収入：円</p>
      <SLi>
        <FiPlus /> 今月の予算を入力
      </SLi>
    </SUl>
  );
};

const SUl = styled.ul`
  height: 100vh;
  width: 200px;
  line-height: 40px;
  float: left;
  text-align: center;
  background-color: white;
  border-right: 1px solid #dcdcdc;
`;

const SLi = styled.li`
  list-style: none;
  color: gray;
  /* &:before {
    margin-right: 10px;
    content: "●";
    color: ${({ color }) => {
    return color;
  }};
  } */
`;
