import axios from "axios";
import { useState, useCallback } from "react";

import { DateSchedule } from "./../../types/shedule/dateShudele.d";
// データ送信がしたい

interface Props {
    id: string
    uid: string
    startingDate: string 
    endingDate: string 
    startingTime: string 
    endingTime: string 
    item: string 
    spendingAmoun: number
    incomeAmount: number
}


export const useSceduleData = () => {
  const [dateShedules, setDateSchedules] = useState<DateSchedule>();

  const postDateSchedules = useCallback((props: Props) => {
    const { id, uid ,startingDate, endingDate, startingTime, endingTime ,item, spendingAmoun, incomeAmount} = props;
    console.log("POSTtest.")
    axios
      .post('hpipenv install', {
        props
      })
      .then(function (response) {
        // 送信成功時の処理
        console.log(response);
        console.log("データ送信完了");
      })
      .catch(function (error) {
        // 送信失敗時の処理
        console.log(error);
        console.log("送信できませんでした。");
      });
    }, []);
  return { postDateSchedules, dateShedules };
};