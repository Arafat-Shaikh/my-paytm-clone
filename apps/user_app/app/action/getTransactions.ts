import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/db/client";

export default async function getTransactions() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return transactions.map((t) => {
    return {
      amount: t.amount,
      provider: t.provider,
      startTime: t.startTime,
      status: t.status,
    };
  });
}
