import { useSetRecoilState } from "recoil";
import { balanceAtom } from "../atom/balance";

export const useSetBalance = () => {
  const setBalance = useSetRecoilState(balanceAtom);
  return setBalance;
};
