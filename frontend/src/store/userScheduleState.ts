import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Schedule } from "../../types/shedule/shudele";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

export const userScheduleState = atom<Schedule | null>({
  key: "userScheduleState",
  default: {
    date: "0",
    incomeAmount: 0,
    schedule: [
      {
        date: "",
        startingDate: "",
        endingDate: "",
        startingTime: "",
        endingTime: "",
        item: "",
        spendingAmount: 0,
      },
    ],
    spendingAmount: 0,
    usingAmount: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
