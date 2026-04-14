import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const siteUrl = "https://thedevdna.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: "DevDNA | GitHub Developer Personality Graph",
  description:
    "Generate a dynamic, embeddable GitHub Developer Personality Graph card to showcase your unique coding identity.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "DevDNA | GitHub Developer Personality Graph",
    description: "Generate dynamic GitHub personality cards.",
    url: siteUrl,
    siteName: "DevDNA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DevDNA | GitHub Developer Personality Graph",
    description: "Generate dynamic GitHub personality cards.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
