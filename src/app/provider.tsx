"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};
