import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import { GetSchedule } from "../../types/http/get/getShudele";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: sessionStorage,
});

export const userScheduleState = atom<GetSchedule | null>({
  key: "userScheduleState",
  default: {
    date: "0",
    incomeAmount: 0,
    schedule: [
      {
        id: "",
        startingDateTime: "",
        endingDateTime: "",
        item: "",
        spendingAmount: 0,
      },
    ],
    spendingAmount: 0,
    usingAmount: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
