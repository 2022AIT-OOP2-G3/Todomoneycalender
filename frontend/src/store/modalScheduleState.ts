import { atom } from "recoil";

export const modalScheduleState = atom({
  key: "modalScheduleState",
  default: { isOpen: false },
});
