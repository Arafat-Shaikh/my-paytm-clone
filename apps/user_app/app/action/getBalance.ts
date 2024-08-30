import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/db/client";

export default async function getBalance() {
  const session = await getServerSession(authOptions);

  const balanceInfo = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  const amount = balanceInfo?.amount || 0;
  const locked = balanceInfo?.locked || 0;

  return {
    amount,
    locked,
  };
}
