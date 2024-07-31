import type { Metadata } from "next";
import {
  Noto_Sans_Thai as FontSans,
  Inter as FontInter,
} from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/app.provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  display: "swap",
  subsets: ["thai", "latin"],
  variable: "--font-noto-sans-thai",
});

const fontInter = FontInter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Greeze App",
  description: "Greeze App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontInter.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
