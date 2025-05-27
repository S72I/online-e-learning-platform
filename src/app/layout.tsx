'use client'
import { Geist, Geist_Mono, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Navbar from "@/components/Navbar/index"
import Footer from "@/components/Footer/index"
import '@fontsource/be-vietnam-pro';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beVietnamPro.className} antialiased`}
      >
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}

