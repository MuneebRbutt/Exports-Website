import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const barlow = Barlow_Condensed({ 
  subsets: ["latin"], 
  weight: ["400", "700"],
  variable: "--font-barlow" 
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${barlow.variable} font-body antialiased`}>
        <SessionProvider>
          {children}
          <Toaster position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
