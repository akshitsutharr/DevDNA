"use client";

import { useState } from "react";
import { Github, Play, Copy, Check, Sparkles } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState("torvalds");
  const [theme, setTheme] = useState("dark");
  const [previewUrl, setPreviewUrl] = useState("/api/dev-dna?username=torvalds&theme=dark");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!username) return;
    setIsLoading(true);
    setPreviewUrl(`/api/dev-dna?username=${encodeURIComponent(username)}&theme=${theme}`);
    setTimeout(() => setIsLoading(false), 800);
  };

  const copyToClipboard = () => {
    const markdown = `[![DevDNA](https://thedevdna.vercel.app/api/dev-dna?username=${username}&theme=${theme})](https://devdna.test)`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="container animate-fade-in">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold", fontSize: "1.5rem" }}>
          <Sparkles color="var(--accent)" size={32} />
          <span className="gradient-text">DevDNA</span>
        </div>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <a href="#how-it-works" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseOver={e => e.target.style.color="var(--foreground)"} onMouseOut={e => e.target.style.color="var(--text-muted)"}>How it Works</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github color="var(--foreground)" size={24} />
          </a>
        </nav>
      </header>

      <div style={{ display: "flex", gap: "4rem", alignItems: "center", flexWrap: "wrap" }}>
        {/* Left Side: Hero & Form */}
        <section style={{ flex: "1 1 400px" }}>
          <h1 style={{ fontSize: "3.5rem", lineHeight: "1.1", marginBottom: "1.5rem" }}>
            Uncover your <br />
            <span className="gradient-text">Coding Identity.</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", lineHeight: "1.6", marginBottom: "2rem" }}>
            Generate a dynamic, embeddable GitHub Developer Personality Graph card. AI-styled developer traits visualized as a futuristic graph.
          </p>

          <form onSubmit={handleGenerate} className="glass-panel" style={{ padding: "2rem", marginBottom: "2rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--text-muted)" }}>GitHub Username</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="e.g. torvalds"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "var(--text-muted)" }}>Theme Preferences</label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["dark", "light", "neon"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: theme === t ? "var(--accent)" : "rgba(255,255,255,0.05)",
                      color: theme === t ? "#fff" : "var(--foreground)",
                      border: `1px solid ${theme === t ? "var(--accent)" : "var(--card-border)"}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textTransform: "capitalize"
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", fontSize: "1.1rem" }}>
              {isLoading ? <div className="spinner" /> : <Play size={20} />}
              Generate Profile
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
            <span>Systems online & receiving global requests</span>
          </div>
        </section>

        {/* Right Side: Preview */}
        <section style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="glass-panel" style={{ padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "150%", height: "150%", background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)", opacity: 0.3, zIndex: 0 }} />
            
            <div style={{ zIndex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "600" }}>Live Preview</div>
              <img 
                src={previewUrl} 
                alt={`${username}'s DevDNA`} 
                style={{ width: "100%", maxWidth: "480px", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }} 
                onError={(e) => { e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='none'><rect width='100%' height='100%' fill='%231a1b23' rx='12'/><text x='50%' y='50%' fill='%238b92a5' text-anchor='middle' font-family='sans-serif'>Generation Error or Loading API...</text></svg>" }}
              />
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: "600" }}>Markdown Embed</span>
              <button 
                onClick={copyToClipboard}
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: "600" }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <div style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px", fontFamily: "monospace", fontSize: "0.85rem", color: "var(--text-muted)", wordBreak: "break-all" }}>
              {`[![DevDNA](https://thedevdna.vercel.app/api/dev-dna?username=${username}&theme=${theme})](https://devdna.test)`}
            </div>
          </div>
        </section>
      </div>

      <footer style={{ marginTop: "6rem", borderTop: "1px solid var(--card-border)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        <p>© 2026 DevDNA. Built by Akshit.</p>
        <p>Powered by Next.js, Satori & GitHub API</p>
      </footer>
    </main>
  );
}
