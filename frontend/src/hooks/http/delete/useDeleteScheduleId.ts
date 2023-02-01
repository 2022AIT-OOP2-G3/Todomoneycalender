import axios from "axios";
import { useCallback } from "react";
import {auth, } from "../../firebase/firebase"

interface Props {
  id: number;
}

export const useDeleteScheduleId = () => {
  const deleteSchedule = useCallback((props: Props) => {
    const { id } = props;
    const userToken = auth.currentUser?.getIdToken;

    axios
      .delete(`http://127.0.0.1:5000/schedule/${id}`, {
        data: id,
        headers: { Authorization: "JWT " + userToken}
      })
      .then(() => alert("削除しました"))
      .catch(() => alert("削除に失敗しました"));
  }, []);
  return { deleteSchedule };
};
