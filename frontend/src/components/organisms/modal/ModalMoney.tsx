import { FC, useState, ChangeEvent, useCallback, memo } from "react";
import styled from "styled-components";
import { FiXCircle } from "react-icons/fi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { ModalLayout } from "../../templates/ModalLayOut";
import { ModalInput } from "../../atoms/input/ModalInput";
import { FormButton } from "../../atoms/button/FormButton";
import { CloseButton } from "../../atoms/button/CloseButton";
import { modalMoneyState } from "../../../store/modalMoneyState";
import { userScheduleState } from "../../../store/userScheduleState";
import { changeScheduleState } from "../../../store/changeScheduleState";
import { usePostSpendingAmount } from "../../../hooks/http/post/usePostSpendingAmount";

export const ModalMoney: FC = memo(() => {
  const [spendingAmount, setSpendingAmount] = useState("");

  const userSchedule = useRecoilValue(userScheduleState);
  const setChangeSchedule = useSetRecoilState(changeScheduleState);
  const [modalMoney, setModalMoney] = useRecoilState(modalMoneyState);

  const { postSpendingAmount } = usePostSpendingAmount();

  const onChangeSpendingAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setSpendingAmount(e.target.value);

  const onClickCloseModal = useCallback(() => {
    setModalMoney({ isOpen: !modalMoney.isOpen });
  }, [setModalMoney, modalMoney]);

  const onClickPostData = useCallback(() => {
    postSpendingAmount({
      spendingAmount: Number(spendingAmount),
      date: userSchedule?.date,
    });
    setModalMoney({ isOpen: !modalMoney.isOpen });
    setChangeSchedule({ isChange: true });
  }, [
    postSpendingAmount,
    setModalMoney,
    setChangeSchedule,
    modalMoney,
    spendingAmount,
    userSchedule,
  ]);

  return (
    <ModalLayout>
      <CloseButton onClick={onClickCloseModal}>
        <FiXCircle color="gray" size={20} />
      </CloseButton>
      <SH1>今月の予算</SH1>
      <FormGroup>
        <label>今月の予算</label>
        <ModalInput
          type="number"
          value={spendingAmount}
          placeholder=""
          onChange={onChangeSpendingAmount}
        />
      </FormGroup>
      <FormButton onClick={onClickPostData} disabled={spendingAmount === ""}>
        予算を決定
      </FormButton>
    </ModalLayout>
  );
});

const FormGroup = styled.div`
  clear: both;
`;

const SH1 = styled.h1`
  margin-bottom: 15px;
  border-bottom: 1px solid #d3d3d3;
`;
