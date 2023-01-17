import styled from "styled-components";
import { FC, useState, ChangeEvent, useCallback } from "react";
import { FiXCircle } from "react-icons/fi";

import { ModalInput } from "../../atoms/input/ModalInput";
import { FormButton } from "../../atoms/button/FormButton";
import { CloseButton } from "../../atoms/button/CloseButton";
import { ModalLayout } from "../../templates/ModalLayOut";
import { useScheduleData } from "../../../hooks/post/useScheduleData";
import { useMoneyData } from "../../../hooks/post/useMoneyData";

type Props = {
  uid: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const ModalMoney: FC<Props> = (props) => {
  const { uid, isOpen, setIsOpen } = props;

  const { postMoneyData } = useMoneyData();

  const [spendingAmount, setSpendingAmount] = useState("");

  const onChangeSpendingAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setSpendingAmount(e.target.value);

  const onClickCloseModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const onClickPostData = useCallback(() => {
    postMoneyData({
      uid: uid,
      spendingAmount: Number(spendingAmount),
    });
    setIsOpen(!isOpen);
  }, [postMoneyData, setIsOpen, uid, isOpen, spendingAmount]);

  return (
    <>
      {isOpen ? (
        <ModalLayout>
          {" "}
          <CloseButton onClick={onClickCloseModal}>
            <FiXCircle color="gray" size={20} />
          </CloseButton>
          <FormGroup>
            <label>今月の予算</label>
            <ModalInput
              type="number"
              placeholder=""
              onChange={onChangeSpendingAmount}
            />
          </FormGroup>
          <FormButton
            onClick={onClickPostData}
            disabled={spendingAmount === ""}
          >
            予定を追加
          </FormButton>
        </ModalLayout>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

const FormTimeGroup = styled.div`
  float: left;
  padding: 30px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

const FormGroup = styled.div`
  clear: both;
`;

const SH1 = styled.h1`
  margin-bottom: 15px;
  border-bottom: 1px solid #d3d3d3;
`;
