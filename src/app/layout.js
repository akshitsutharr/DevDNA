import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "DevDNA | GitHub Developer Personality Graph",
  description: "Generate a dynamic, embeddable GitHub Developer Personality Graph card to showcase your unique coding identity.",
  openGraph: {
    title: "DevDNA",
    description: "Generate dynamic GitHub personality cards.",
    siteName: "DevDNA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
