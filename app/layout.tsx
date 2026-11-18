import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ValDiscov — a field guide to value",
  description:
    "An open collection of questions about what makes things matter, made richer by many points of view.",
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
