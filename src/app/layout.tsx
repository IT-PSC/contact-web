import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANDAI — Digital Namecard",
  description: "SANDAI employee digital namecard",
  other: {
    "color-scheme": "light",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f3f3f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
