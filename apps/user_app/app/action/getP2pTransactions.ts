import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { prisma } from "@repo/db/client";

export async function getP2pTransactions() {
  const session = await getServerSession(authOptions);

  if (!session.user) {
    return null;
  }

  const userP2pTransactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session.user.id) },
        { toUserId: Number(session.user.id) },
      ],
    },
  });

  const modUserP2p = userP2pTransactions.map((x: any) => {
    if (x.fromUserId === Number(session.user.id)) {
      return { ...x, payment: "Paid" };
    } else {
      return { ...x, payment: "Received" };
    }
  });

  return modUserP2p;
}
