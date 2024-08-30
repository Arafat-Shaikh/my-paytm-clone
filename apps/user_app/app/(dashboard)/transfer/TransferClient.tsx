"use client";
import React, { useState } from "react";
import { createTransaction } from "../../action/createTransaction";
import { useRouter } from "next/navigation";

interface TransactionDataType {
  amount: number;
  provider: string;
  status: string;
  startTime: Date;
}

interface TransferClientProps {
  amount: number;
  locked: number;
  onRampTransactions: TransactionDataType[];
}

const TransferClient: React.FC<TransferClientProps> = ({
  amount,
  locked,
  onRampTransactions,
}) => {
  const [bankName, setBankName] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const router = useRouter();

  async function handleAddMoney() {
    const res = await createTransaction(Number(transferAmount), bankName);
    console.log(res);
    if (res?.success) {
      router.refresh();
    }
  }

  console.log(onRampTransactions);

  return (
    <div className="pr-16 pl-4">
      <div>
        <h1 className="text-3xl font-bold text-purple-700">Transfer</h1>
      </div>
      <div className="mt-8 flex lg:flex-row flex-col lg:gap-x-6 gap-y-3 ">
        <div className="flex-1 h-full p-6 border rounded-md ">
          <div className="border-b border-neutral-100 mb-4 pb-3">
            <h1 className="font-semibold">Add Money</h1>
          </div>
          <div className="flex flex-col gap-y-1.5 mt-2">
            <label htmlFor="" className="text-xs font-bold">
              Amount
            </label>
            <input
              onChange={(e) => setTransferAmount(e.target.value)}
              type="number"
              className="px-2 py-1.5 focus:outline-none border-gray-300 border-[1px] placeholder-gray-500 text-black rounded-md text-sm"
              placeholder="20000"
            />
          </div>
          <div className="flex flex-col gap-y-1.5 mt-6">
            <label htmlFor="" className="text-xs font-bold">
              Bank
            </label>
            <select
              onChange={(e) => setBankName(e.target.value)}
              className="px-2 py-1.5 focus:outline-none border-gray-300 border-[1px] placeholder-gray-500 text-gray-500 rounded-md text-sm "
              name=""
              id=""
            >
              <option className="text-black py-1" value="hdfc">
                hdfc
              </option>
              <option className="text-black py-1" value="kotak">
                kotak
              </option>
              <option className="text-black py-1" value="axis">
                axis
              </option>
            </select>
          </div>
          <div className="flex justify-center mt-6 pb-4">
            <button
              onClick={handleAddMoney}
              className="px-4 py-1.5 bg-gray-700 rounded-md focus:outline-none outline-none transition text-white font-medium text-sm hover:bg-gray-600"
            >
              Add Money
            </button>
          </div>
        </div>
        <div className="flex-1 h-full p-6 border rounded-md">
          <div>
            <div className="border-b border-neutral-100 mb-4 pb-3 ">
              <h1 className="font-semibold">Balance</h1>
            </div>
            <div className="flex flex-col divide-y gap-y-3 divide-gray-300">
              <div className="flex items-center justify-between text-sm">
                <p>Unlocked balance</p>
                <p>
                  <span>{amount}</span> INR
                </p>
              </div>
              <div className="flex items-center justify-between text-sm pt-1">
                <p>Total Locked balance</p>
                <p>
                  <span>{locked}</span> INR
                </p>
              </div>{" "}
              <div className="flex items-center justify-between text-sm pt-1">
                <p>Total balance</p>
                <p>
                  <span>{amount + locked}</span> INR
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mt-6 border-b border-neutral-100 mb-4 pb-3 ">
              <h1 className="font-semibold">Recent Transactions</h1>
            </div>
            {!onRampTransactions.length ? (
              <div className="flex my-4 justify-center items-center">
                <p>No Recent transactions</p>
              </div>
            ) : (
              <div className=" max-h-[240px] overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-y-1 my-4 justify-center items-center">
                  {onRampTransactions.map((t: any, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center w-full"
                    >
                      <div>
                        <h2 className="text-sm font-semibold">Received INR</h2>
                        <p className="text-xs text-neutral-500">
                          {t.startTime.toDateString()}
                        </p>
                      </div>
                      <div className="text-xs font-semibold text-purple-800">
                        {t.status}
                      </div>
                      <div className="inline-flex items-center text-xs font-semibold justify-center gap-x-2">
                        <span>+ Rs </span>
                        <p>{t.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferClient;
