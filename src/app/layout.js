
import { Roboto, Metal_Mania, Creepster } from "next/font/google";
import Providers from "./providers";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const metalMania = Metal_Mania({
  subsets: ["latin"],
  weight: "400", // 🔥 IMPORTANT FIX
  variable: "--font-metalmania",
  display: "swap",
});

const creepster = Creepster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-creepster",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={`${roboto.variable} ${metalMania.variable}`}>
    
        <Providers>{children}</Providers>
      </body>
      
    </html>
  );
}