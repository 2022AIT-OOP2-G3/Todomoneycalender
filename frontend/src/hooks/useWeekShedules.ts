import axios from "axios";
import { useState, useCallback } from "react";

export const useAllUsers = () => {
  const [weekShedules, setWeekSchedules] = useState([]);

  const getWeekSchedules = useCallback(() => {
    // ここにaxiosを用いた週予定のデータ取得の処理を記述する
  }, []);
  return { getWeekSchedules, weekShedules };
};
