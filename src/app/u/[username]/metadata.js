const siteUrl = "https://thedevdna.vercel.app";

export async function generateMetadata({ params, searchParams }) {
  const { username } = await params;
  const theme = (await searchParams)?.theme || "dark";

  const pageUrl = `${siteUrl}/u/${encodeURIComponent(username)}?theme=${encodeURIComponent(theme)}`;
  const imageUrl = `${siteUrl}/api/dev-dna?username=${encodeURIComponent(username)}&theme=${encodeURIComponent(theme)}`;

  return {
    title: `DevDNA for ${username} | GitHub Developer Personality Graph`,
    description: `Generate an embeddable DevDNA card for ${username}.`,
    alternates: { canonical: `${siteUrl}/u/${encodeURIComponent(username)}` },
    openGraph: {
      title: `DevDNA for ${username}`,
      description: `Generate an embeddable DevDNA card for ${username}.`,
      url: pageUrl,
      type: "website",
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: `DevDNA for ${username}`,
      description: `Generate an embeddable DevDNA card for ${username}.`,
      images: [imageUrl],
    },
  };
}