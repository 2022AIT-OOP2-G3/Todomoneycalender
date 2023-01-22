import { atom } from "recoil";

export const changeScheduleState = atom({
  key: "changeScheduleState",
  default: { isChange: true },
});
