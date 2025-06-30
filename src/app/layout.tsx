import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/app/providers";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "SPOT",
  description: "지나온 공간에 당신의 기록을 남겨보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthGuard>{children}</AuthGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
