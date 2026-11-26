import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANDAI — Digital Namecard",
  description: "SANDAI employee digital namecard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
