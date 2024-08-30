"use client";
import { useState } from "react";
import Container from "../../components/Container";
import { payViaNumber } from "../../action/payViaNumber";
import { useRouter } from "next/navigation";

interface P2pClientProps {
  id: number;
  amount: number;
  timeStamp: Date;
  fromUserId: number;
  toUserId: number;
  payment: string;
}

interface P2pClientPropsData {
  data: P2pClientProps[] | null;
}

const P2pClient: React.FC<P2pClientPropsData> = ({ data }) => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  async function handlePaymentByNumber() {
    payViaNumber(amount, number);
  }

  console.log(data);

  return (
    <Container>
      <div className="bg-white grid grid-cols-5 auto-rows-min items-start md:gap-x-10 lg:pr-20 lg:px-10">
        <div className="bg-gray-50 shadow-md rounded-lg p-4 col-span-2">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-center font-semibold text-lg border-b pb-3 mb-2">
              Pay via number
            </h1>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="" className="text-sm font-semibold">
                Phone
              </label>
              <input
                onChange={(e) => setNumber(e.target.value)}
                type="text"
                placeholder="Phone"
                className="placeholder:text-xs focus:outline-none border rounded-md text-sm p-2 lg:min-w-[300px] w-full"
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="" className="text-sm font-semibold">
                Amount
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Amount"
                className="placeholder:text-xs focus:outline-none border rounded-md text-sm p-2 lg:min-w-[300px] w-full"
              />
            </div>
            <div className="mt-2">
              <button
                onClick={handlePaymentByNumber}
                className="w-full py-1.5 bg-gray-600 text-white rounded-md outline-none shadow-sm"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 shadow-md rounded-lg px-8 py-4 col-span-3">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-center font-semibold text-lg border-b pb-3 mb-2">
              Recent Transactions
            </h1>
            {data?.map((x) => (
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-medium text-sm">{x.payment}</h2>
                  <p className="text-xs text-gray-500">
                    {x.timeStamp.toDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="inline-flex gap-x-3 items-center text-sm font-medium">
                    <span>+</span>
                    {x.amount}
                  </p>
                  <p className="text-gray-600 text-sm">{x.toUserId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default P2pClient;
