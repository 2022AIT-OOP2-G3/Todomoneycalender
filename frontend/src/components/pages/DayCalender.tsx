import { memo, useEffect } from "react";
import { useDateSchedules } from "../../hooks/useDateSchedules";
import { useSceduleData } from "../../hooks/useSceduleData";

export const DayCalender = memo(() => {
  const { getDateSchedules } = useDateSchedules()
  useEffect(() => getDateSchedules({ year: "1", month: '1', date: 'a' }), [])
  return <p>日カレンダーページです</p>;
  const { postDateSchedules } = useSceduleData()
  useEffect(() => postDateSchedules({ id: "string",
    uid: "string",
    startingDate: "string" ,
    endingDate: "string" ,
    startingTime: "string" ,
    endingTime: "string", 
    item: "string" ,
    spendingAmoun: 123,
    incomeAmount: 456}), [])
});
