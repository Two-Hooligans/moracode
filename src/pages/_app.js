import "../styles/global.css";
import { Space_Grotesk, Space_Mono } from "next/font/google";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={`${grotesk.variable} ${mono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
