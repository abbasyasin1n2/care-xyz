import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/shared/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Care.xyz - Baby Sitting & Elderly Care Service",
  description: "Reliable and trusted care services for children, elderly, and other family members in Bangladesh",
  icons: {
    icon: 'https://i.ibb.co.com/8gs1VMjc/Screenshot-2025-12-24-142240.png',
    shortcut: 'https://i.ibb.co.com/8gs1VMjc/Screenshot-2025-12-24-142240.png',
    apple: 'https://i.ibb.co.com/8gs1VMjc/Screenshot-2025-12-24-142240.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
