export default function DevDNACard({ data, theme = "dark" }) {
  const themes = {
    dark: { bg: "#0f1015", fg: "#ffffff", accent: "#6b4cff", border: "rgba(255,255,255,0.08)", textMuted: "#8b92a5", cardBg: "#14151c" },
    light: { bg: "#f8f9fc", fg: "#0f1015", accent: "#4f46e5", border: "rgba(0,0,0,0.08)", textMuted: "#525b75", cardBg: "#ffffff" },
    neon: { bg: "#09090b", fg: "#ffffff", accent: "#00ffcc", border: "rgba(0,255,204,0.3)", textMuted: "#9ca3af", cardBg: "#09090b" }
  };
  
  const colors = themes[theme] || themes.dark;
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 800,
        height: 480,
        backgroundColor: colors.bg,
        color: colors.fg,
        fontFamily: "Inter",
        padding: "40px",
        borderRadius: "24px",
        border: `2px solid ${colors.border}`,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Glow */}
      <div 
        style={{
          position: "absolute",
          top: "-50%",
          left: "-10%",
          width: "120%",
          height: "200%",
          background: `radial-gradient(circle, ${colors.accent}40 0%, transparent 60%)`,
          display: "flex",
          zIndex: 0
        }}
      />
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1, marginBottom: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {data.avatarUrl && (
            <img 
              src={data.avatarUrl} 
              width={80} 
              height={80} 
              style={{ borderRadius: "50%", border: `3px solid ${colors.accent}`, boxShadow: `0 0 20px ${colors.accent}80` }} 
            />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: 0, fontSize: "36px", fontWeight: 700 }}>{data.name}</h1>
            <p style={{ margin: 0, fontSize: "20px", color: colors.textMuted }}>@{data.login}</p>
          </div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ background: colors.accent, padding: "8px 20px", borderRadius: "100px", fontSize: "18px", fontWeight: 700, color: "#fff", display: "flex", boxShadow: `0 4px 14px ${colors.accent}80` }}>
            {data.archetype}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", gap: "40px", flex: 1, zIndex: 1 }}>
        {/* Left Stats Column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "20px" }}>
          {/* Top Languages */}
          <div style={{ display: "flex", flexDirection: "column", background: colors.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
            <h2 style={{ margin: 0, marginBottom: "16px", fontSize: "16px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>Tech Focus</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", lineHeight: 1 }}>
              {data.topLanguages.map(lang => (
                <div key={lang} style={{ display: "flex", background: `${colors.accent}20`, color: colors.accent, padding: "6px 12px", borderRadius: "8px", fontSize: "18px", fontWeight: 600 }}>
                  {lang}
                </div>
              ))}
              {data.topLanguages.length === 0 && (
                <div style={{ display: "flex", color: colors.textMuted }}>No public repository languages found.</div>
              )}
            </div>
          </div>
          
          {/* Base Stats */}
          <div style={{ display: "flex", justifyContent: "space-between", background: colors.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 700 }}>{data.stats.stars}</span>
              <span style={{ fontSize: "14px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>Stars</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 700 }}>{data.stats.commits}</span>
              <span style={{ fontSize: "14px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>Commits</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 700 }}>{data.stats.prs}</span>
              <span style={{ fontSize: "14px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px" }}>PRs</span>
            </div>
          </div>
        </div>

        {/* Right Radar Graph Column (Simplified bars for clean SVG support) */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, background: colors.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          <h2 style={{ margin: 0, marginBottom: "20px", fontSize: "16px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>Personality Graph</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {data.traits.map(trait => (
              <div key={trait.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: 600 }}>
                  <span>{trait.label}</span>
                  <span style={{ color: colors.accent }}>{trait.value}%</span>
                </div>
                {/* SVG Progress Bar */}
                <div style={{ display: "flex", width: "100%", height: "8px", background: `${colors.border}`, borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ display: "flex", width: `${trait.value}%`, height: "100%", background: colors.accent, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div style={{ position: "absolute", bottom: "16px", right: "24px", display: "flex", zIndex: 1, fontSize: "14px", color: colors.textMuted, fontWeight: 600 }}>
        Generated by DevDNA
      </div>
    </div>
  );
}
