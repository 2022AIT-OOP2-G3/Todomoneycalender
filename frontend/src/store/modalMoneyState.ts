import { atom } from "recoil";

export const modalMoneyState = atom({
  key: "modalMoneyState",
  default: { isOpen: false },
});
