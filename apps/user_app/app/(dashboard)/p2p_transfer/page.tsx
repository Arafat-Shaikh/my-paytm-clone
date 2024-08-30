import React from "react";
import ClientOnly from "../../components/ClientOnly";
import P2pClient from "./P2pClient";
import { getP2pTransactions } from "../../action/getP2pTransactions";

const P2pTransferPage = async () => {
  const p2pTransactions = await getP2pTransactions();
  console.log(p2pTransactions);
  return (
    <ClientOnly>
      <P2pClient data={p2pTransactions} />
    </ClientOnly>
  );
};

export default P2pTransferPage;
