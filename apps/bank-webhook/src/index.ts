import express from "express";
import { prisma } from "@repo/db/client";
const app = express();

app.use(express.json());

interface PaymentInfoType {
  token: string;
  userId: string;
  amount: string;
}

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: PaymentInfoType = {
    token: req.body?.token,
    userId: req.body?.userId,
    amount: req.body?.amount,
  };

  try {
    const txn = await prisma.onRampTransaction.findUnique({
      where: {
        token: paymentInformation.token,
        status: "Processing",
      },
    });

    if (!txn) {
      res.status(201).json({ message: "Transaction already completed" });
      return;
    }

    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({ message: "Captured" }).status(200);
  } catch (error) {
    console.log(error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json(req.body);
});

app.listen(8080, () => {
  console.log("bank-webhook-handler server started on port 8080");
});
