import axios from "axios";
import { useCallback } from "react";

interface Props {
  id: number;
}

export const useDeleteScheduleId = () => {
  const deleteSchedule = useCallback((props: Props) => {
    const { id } = props;

    axios
      .delete(`http://127.0.0.1:5000/schedule/${id}`, {
        data: id,
      })
      .then(() => alert("削除しました"))
      .catch(() => alert("削除に失敗しました"));
  }, []);
  return { deleteSchedule };
};
