import styled from "styled-components";
import { FC, useState, ChangeEvent, useCallback } from "react";
import { FiXCircle } from "react-icons/fi";

import { ModalInput } from "../../atoms/input/ModalInput";
import { FormButton } from "../../atoms/button/FormButton";
import { CloseButton } from "../../atoms/button/CloseButton";
import { ModalLayout } from "../../templates/ModalLayOut";
import { useScheduleData } from "../../../hooks/post/useScheduleData";

type Props = {
  uid: string;
  startingDay: string;
  endingDay: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const ModalSchedule: FC<Props> = (props) => {
  const { uid, startingDay, endingDay, isOpen, setIsOpen } = props;

  const { postScheduleData } = useScheduleData();

  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [item, setItem] = useState("");
  const [spendingAmount, setSpendingAmount] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const onChangeStartingTime = (e: ChangeEvent<HTMLInputElement>) =>
    setStartingTime(e.target.value);
  const onChangeEndingTime = (e: ChangeEvent<HTMLInputElement>) =>
    setEndingTime(e.target.value);
  const onChangeItem = (e: ChangeEvent<HTMLInputElement>) =>
    setItem(e.target.value);
  const onChangeSpendingAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setSpendingAmount(e.target.value);
  const onChangeIncomeAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setIncomeAmount(e.target.value);

  const onClickCloseModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const onClickPostData = useCallback(() => {
    postScheduleData({
      uid: uid,
      startingDay: startingDay,
      endingDay: endingDay,
      startingTime: startingTime,
      endingTime: endingTime,
      item: item,
      spendingAmount: Number(spendingAmount),
      incomeAmount: Number(incomeAmount),
    });
    setIsOpen(!isOpen);
  }, [
    postScheduleData,
    setIsOpen,
    isOpen,
    uid,
    startingDay,
    endingDay,
    endingTime,
    startingTime,
    item,
    spendingAmount,
    incomeAmount,
  ]);

  return (
    <>
      {isOpen ? (
        <ModalLayout>
          {" "}
          <CloseButton onClick={onClickCloseModal}>
            <FiXCircle color="gray" size={20} />
          </CloseButton>
          <SH1>{startingDay}の予定</SH1>
          <FormGroup>
            <label>予定</label>
            <ModalInput type="text" placeholder="" onChange={onChangeItem} />
          </FormGroup>
          <FormTimeGroup>
            <label>開始時刻</label>
            <ModalInput
              type="time"
              placeholder=""
              onChange={onChangeStartingTime}
            />
          </FormTimeGroup>
          <FormTimeGroup>
            <label>終了時刻</label>
            <ModalInput
              type="time"
              placeholder=""
              onChange={onChangeEndingTime}
            />
          </FormTimeGroup>
          <FormGroup>
            <label>予定による支出</label>
            <ModalInput
              type="number"
              placeholder=""
              onChange={onChangeSpendingAmount}
            />
          </FormGroup>
          <FormGroup>
            <label>予定による収入</label>
            <ModalInput
              type="number"
              placeholder=""
              onChange={onChangeIncomeAmount}
            />
          </FormGroup>
          <FormButton
            onClick={onClickPostData}
            disabled={
              startingDay === "" ||
              endingDay === "" ||
              item === "" ||
              spendingAmount === "" ||
              incomeAmount === ""
            }
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
