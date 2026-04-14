export default async function UserCardPage({ params, searchParams }) {
  const { username } = await params;
  const theme = (await searchParams)?.theme || "dark";

  const siteUrl = "https://thedevdna.vercel.app";
  const cardUrl = `${siteUrl}/api/dev-dna?username=${encodeURIComponent(username)}&theme=${encodeURIComponent(theme)}`;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 12 }}>
        DevDNA for <span style={{ color: "#7c3aed" }}>{username}</span>
      </h1>

      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Generate an embeddable GitHub Developer Personality Graph (SVG) for {username}. Copy the markdown and paste it into your README.
      </p>

      <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: 18 }}>
        <img
          src={cardUrl}
          alt={`DevDNA card for ${username}`}
          style={{ width: "100%", maxWidth: 720, display: "block", margin: "0 auto" }}
        />
      </div>

      <h2 style={{ marginTop: 28, fontSize: "1.2rem" }}>Embed in README</h2>
      <pre style={{ marginTop: 10, padding: 14, borderRadius: 10, overflowX: "auto", background: "rgba(0,0,0,0.35)" }}>
{`[![DevDNA](${cardUrl})](${siteUrl})`}
      </pre>

      <p style={{ marginTop: 24 }}>
        <a href="/" style={{ color: "#7c3aed", fontWeight: 600 }}>← Back to DevDNA Generator</a>
      </p>
    </main>
  );
}