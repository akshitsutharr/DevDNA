export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://thedevdna.vercel.app/sitemap.xml",
  };
}