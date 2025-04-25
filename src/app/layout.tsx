import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
