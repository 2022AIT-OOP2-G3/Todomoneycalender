import { FC, useCallback } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { FiPlus } from "react-icons/fi";
import { modalMoneyState } from "../../../store/modalMoneyState";
import { ModalMoney } from "../../organisms/modal/ModalMoney";
import { userScheduleState } from "../../../store/userScheduleState";

export const SideBarContent: FC = () => {
  const userSchedule = useRecoilValue(userScheduleState);
  const [modalMoney, setModalMoney] = useRecoilState(modalMoneyState);

  const onClickOpenModal = useCallback(() => {
    setModalMoney({ isOpen: !modalMoney.isOpen });
  }, [setModalMoney, modalMoney]);


  return (
    <>
      <ModalMoney />
      <SUl>
        <p>今月の予算：{userSchedule?.spendingAmount}円</p>
        <p>今月の支出：{userSchedule?.usingAmount}円</p>
        <p>今月の収入：{userSchedule?.incomeAmount}円</p>
        <SLi onClick={onClickOpenModal}>
          <FiPlus /> 今月の予算を入力
        </SLi>
      </SUl>
    </>
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
  cursor: pointer;
  /* &:before {
    margin-right: 10px;
    content: "●";
    color: ${({ color }) => {
    return color;
  }};
  } */
`;
