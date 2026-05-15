import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Meharstare | Premium Sportswear & Casual Wear Export",
    template: "%s | Meharstare"
  },
  description: "Meharstare is a leading Pakistani export brand specializing in high-performance sportswear, casual wear, and premium gloves for global markets.",
  keywords: ["sportswear", "export", "Pakistan", "jerseys", "tracksuits", "boxing gloves", "B2B sportswear"],
};

import { Toaster } from "react-hot-toast";
import SessionProvider from "@/components/providers/SessionProvider";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <SessionProvider>
          {children}
          <Toaster position="bottom-right" />
        </SessionProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
