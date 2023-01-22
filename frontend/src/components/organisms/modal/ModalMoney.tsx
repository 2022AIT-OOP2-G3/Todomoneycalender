import { FC, useState, ChangeEvent, useCallback, memo } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { FiXCircle } from "react-icons/fi";

import { ModalLayout } from "../../templates/ModalLayOut";
import { ModalInput } from "../../atoms/input/ModalInput";
import { FormButton } from "../../atoms/button/FormButton";
import { CloseButton } from "../../atoms/button/CloseButton";
import { useMoneyData } from "../../../hooks/http/post/useMoneyData";
import { modalMoneyState } from "../../../store/modalMoneyState";

export const ModalMoney: FC = memo(() => {
  const [modalMoney, setModalMoney] = useRecoilState(modalMoneyState);

  const { postMoneyData } = useMoneyData();

  const [spendingAmount, setSpendingAmount] = useState("");

  const onChangeSpendingAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setSpendingAmount(e.target.value);

  const onClickCloseModal = useCallback(() => {
    setModalMoney({ isOpen: !modalMoney.isOpen });
  }, [setModalMoney, modalMoney]);

  const onClickPostData = useCallback(() => {
    postMoneyData({
      spendingAmount: Number(spendingAmount),
    });
    setModalMoney({ isOpen: !modalMoney.isOpen });
  }, [postMoneyData, setModalMoney, modalMoney, spendingAmount]);

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
