import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cybokrafts",
  description:
    "AI-powered monitoring systems for Solar, EV, and Transformer energy infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}