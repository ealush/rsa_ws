import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChronoTrips™ Portal",
  description: "Bureaucratic sci-fi time machine rental wizard.",
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
