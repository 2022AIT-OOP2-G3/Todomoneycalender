import axios from "axios";
import { useState, useCallback } from "react";

import { DateSchedule } from "./../../types/shedule/dateShudele.d";

interface Props {
  year: string;
  month: string;
  date: string;
}

export const useDateSchedules = () => {
  const [dateShedules, setDateSchedules] = useState<DateSchedule>();

  const getDateSchedules = useCallback((props: Props) => {
    const { year, month, date } = props;
    console.log("test.")
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        // データが取得できた時の処理
        console.log("asasasa");
        console.log(res);  // resに取得データがオブジェクトで格納される
        console.log(res.data[0]);
        console.log(res.data[0].id);
        console.log(res.data[1].id);
        console.log(res.data[2].id);
        for(let i in res.data){
          if(res.data[i].userId == year){
            console.log(res.data[i]);
          }
        }
        // 例外エラーを発生させる
        throw new Error("<表示させるエラー>");
      })
      // データが取得できなかった時の処理
      .catch((err) => alert("データがうまく取得できませんでした"))
      // 最終的に実行される処理
      .finally(() => {console.log('取得完了！')});
    }, []);
  return { getDateSchedules, dateShedules };
};
