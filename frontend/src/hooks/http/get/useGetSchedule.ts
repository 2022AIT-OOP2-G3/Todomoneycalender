import { useState, useCallback } from "react";
import axios from "axios";

import { auth } from "../../firebase/firebase";
import { GetSchedule } from "../../../../types/http/get/getShudele"; 

interface Props {
  year: string;
  month: string;
}

export const useGetSchedule = () => {
  const [schedule, setSchedules] = useState<GetSchedule | null>(null);

  const getSchedules = useCallback(async(props: Props) => {
    const { year, month } = props;
    const uid = auth.currentUser?.uid;

    try{const response = await axios.get<GetSchedule>(`http://127.0.0.1:5000/schedule/${uid}/${year}/${month}`)
        setSchedules(response.data)}
    catch(e){
      console.log("エラーが発生しました。axios.getで")
    }
    
    
   
  }, []);
  return { getSchedules, schedule };
};
