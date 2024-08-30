"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import SidebarButton from "./SidebarButton";
import { HomeIcon, P2pIcon, TransactionsIcon, TransferIcon } from "./Icons";

const Navbar = () => {
  const session = useSession();

  return (
    <>
      <div className="fixed bg-white w-full z-10 shadow-sm border-b border-neutral-300">
        <div className="max-w-[2520px] mx-auto">
          <div className="px-2 sm:px-4 md:px-6 py-2 md:py-3 ">
            <div className="flex justify-between items-center">
              <div className="cursor-pointer">
                <p className="text-sm md:text-lg font-medium md:font-semibold">
                  Paytm
                </p>
              </div>
              <div>
                {session.status == "unauthenticated" ? (
                  <button
                    onClick={() => signIn()}
                    className="bg-gray-600 rounded-md shadow-sm text-white text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-1.5 transition hover:shadow-lg"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="bg-gray-600 rounded-md shadow-sm text-white text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-1.5 transition hover:shadow-lg"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16 border-r fixed z-1 border-gray-300 w-72 min-h-screen hidden lg:block">
        <div className="px-2 py-2 flex flex-col gap-y-2">
          <SidebarButton
            hrefLink="/dashboard"
            label="Dashboard"
            icon={<HomeIcon />}
          />
          <SidebarButton
            hrefLink="/transfer"
            label="Transfer"
            icon={<TransferIcon />}
          />
          <SidebarButton
            hrefLink="/transactions"
            label="Transactions"
            icon={<TransactionsIcon />}
          />
          <SidebarButton
            hrefLink="/p2p_transfer"
            label="P2P Transfer"
            icon={<P2pIcon />}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
