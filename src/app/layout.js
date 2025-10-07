"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  useEffect(() => {
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });

    var d = document,
      g = d.createElement("script"),
      s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src =
      "https://cdn.matomo.cloud/bandswebsitenetlifyapp.matomo.cloud/container_LOfPXoAa.js";
    s.parentNode.insertBefore(g, s);
    window._mtm.push({ event: "mtm.PageView" });
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <SessionProvider>
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
 