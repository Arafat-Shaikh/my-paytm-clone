import React from "react";
import ClientOnly from "../../components/ClientOnly";
import TransferClient from "./TransferClient";
import Container from "../../components/Container";
import getBalance from "../../action/getBalance";
import getTransactions from "../../action/getTransactions";

const TransferPage = async () => {
  const balanceInfo = await getBalance();
  const transactions = await getTransactions();

  console.log(transactions);

  return (
    <ClientOnly>
      <Container>
        <TransferClient
          amount={balanceInfo.amount}
          locked={balanceInfo.locked}
          onRampTransactions={transactions}
        />
      </Container>
    </ClientOnly>
  );
};

export default TransferPage;
