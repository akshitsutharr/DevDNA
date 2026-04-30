const siteUrl = "https://devdna.netlify.app";

export default function sitemap() {
  const now = new Date();

  // Add more URLs here if you create more pages later
  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}