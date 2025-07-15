import type { Metadata } from "next";
import { Matemasie, Sour_Gummy } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const matemasie = Matemasie({
  variable: "--font-matemasie",
  weight: '400',
  subsets: ['latin']
});

const sour_gummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "CoCreate",
  description: "Shape Ideas Together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${sour_gummy.variable} 
          ${matemasie.variable}
          font-sour-gummy
          antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
