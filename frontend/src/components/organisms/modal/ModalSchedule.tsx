import { FC, useState, ChangeEvent, useCallback, useEffect } from "react";
import styled from "styled-components";
import { FiXCircle } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";

import { ModalLayout } from "../../templates/ModalLayOut";
import { ModalInput } from "../../atoms/input/ModalInput";
import { FormButton } from "../../atoms/button/FormButton";
import { CloseButton } from "../../atoms/button/CloseButton";
import { usePostSchedule } from "../../../hooks/http/post/usePostSchedule";
import { modalScheduleState } from "../../../store/modalScheduleState";
import { changeScheduleState } from "../../../store/changeScheduleState";

type Props = {
  start: string;
  end: string;
};

export const ModalSchedule: FC<Props> = (props) => {
  const { start, end } = props;

  const [startingDateTime, setStartingDateTime] = useState("");
  const [endingDateTime, setEndingDateTime] = useState("");
  const [item, setItem] = useState("");
  const [spendingAmount, setSpendingAmount] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const setChangeSchedule = useSetRecoilState(changeScheduleState);
  const [modalSchedule, setModalSchedule] = useRecoilState(modalScheduleState);

  const { postScheduleData } = usePostSchedule();

  const onChangeStartingTime = (e: ChangeEvent<HTMLInputElement>) =>
    setStartingDateTime(e.target.value);
  const onChangeEndingTime = (e: ChangeEvent<HTMLInputElement>) =>
    setEndingDateTime(e.target.value);
  const onChangeItem = (e: ChangeEvent<HTMLInputElement>) =>
    setItem(e.target.value);
  const onChangeSpendingAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setSpendingAmount(e.target.value);
  const onChangeIncomeAmount = (e: ChangeEvent<HTMLInputElement>) =>
    setIncomeAmount(e.target.value);

  useEffect(() => {
    setStartingDateTime(start);
    setEndingDateTime(end);
  }, [start, end]);

  const onClickCloseModal = useCallback(() => {
    setModalSchedule({ isOpen: !modalSchedule.isOpen });
  }, [setModalSchedule, modalSchedule]);

  const onClickPostData = useCallback(() => {
    postScheduleData({
      startingDateTime: startingDateTime,
      endingDateTime: endingDateTime,
      item: item,
      spendingAmount: Number(spendingAmount),
      incomeAmount: Number(incomeAmount),
    });
    setModalSchedule({ isOpen: false });
    setChangeSchedule({ isChange: true });
  }, [
    postScheduleData,
    setModalSchedule,
    setChangeSchedule,
    startingDateTime,
    endingDateTime,
    item,
    spendingAmount,
    incomeAmount,
  ]);

  return (
    <ModalLayout>
      <CloseButton onClick={onClickCloseModal}>
        <FiXCircle color="gray" size={20} />
      </CloseButton>
      <SH1>予定登録</SH1>
      <FormGroup>
        <label>予定</label>
        <ModalInput
          type="text"
          value={item}
          placeholder=""
          onChange={onChangeItem}
        />
      </FormGroup>
      <FormTimeGroup>
        <label>開始時刻</label>
        <ModalInput
          type="datetime-local"
          value={startingDateTime}
          placeholder=""
          onChange={onChangeStartingTime}
        />
      </FormTimeGroup>
      <FormTimeGroup>
        <label>終了時刻</label>
        <ModalInput
          type="datetime-local"
          value={endingDateTime}
          placeholder=""
          onChange={onChangeEndingTime}
        />
      </FormTimeGroup>
      <FormGroup>
        <label>予定による支出</label>
        <ModalInput
          type="number"
          value={spendingAmount}
          placeholder=""
          onChange={onChangeSpendingAmount}
        />
      </FormGroup>
      <FormGroup>
        <label>予定による収入</label>
        <ModalInput
          type="number"
          value={incomeAmount}
          placeholder=""
          onChange={onChangeIncomeAmount}
        />
      </FormGroup>
      <FormButton
        onClick={onClickPostData}
        disabled={
          startingDateTime === "" ||
          endingDateTime === "" ||
          item === "" ||
          spendingAmount === "" ||
          incomeAmount === ""
        }
      >
        予定を追加
      </FormButton>
    </ModalLayout>
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
