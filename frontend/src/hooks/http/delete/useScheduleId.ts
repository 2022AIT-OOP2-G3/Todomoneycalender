import axios from "axios";
import { useCallback } from "react";
import { auth } from "../../auth/firebase/firebase";

interface Props {
  id: number;
}

export const useScheduleId = () => {
  const deleteSchedule = useCallback((props: Props) => {
    const { id } = props;

    axios
      .delete(`http://localhost:5000/schedule/${id}`, {
        data: id,
      })
      .then(() => alert("削除しました"))
      .catch(() => alert("削除に失敗しました"));
  }, []);
  return { deleteSchedule };
};
