"use client";

import { useBalance } from "@repo/store/useBalance";
import { useSetBalance } from "@repo/store/useSetBalance";

const Footer = () => {
  const value = useBalance();
  const setBalance = useSetBalance();

  const handleBalanceClick = () => {
    setBalance(value + 5);
  };

  return (
    <div>
      Footer
      <div>{JSON.stringify(value)}</div>
      <button onClick={handleBalanceClick}>Add balance by 5</button>
    </div>
  );
};

export default Footer;
