import { Metadata } from "next";
import { NextLayout, NextProvider } from "./provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Next Map",
  description: "desc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
