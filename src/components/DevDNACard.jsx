export default function DevDNACard({ data, theme = "dark" }) {
  const themes = {
    dark: { bg: "#0f1015", fg: "#ffffff", accent: "#6b4cff", border: "rgba(255,255,255,0.08)", textMuted: "#8b92a5", cardBg: "#14151c" },
    light: { bg: "#f8f9fc", fg: "#0f1015", accent: "#4f46e5", border: "rgba(0,0,0,0.08)", textMuted: "#525b75", cardBg: "#ffffff" },
    neon: { bg: "#09090b", fg: "#ffffff", accent: "#00ffcc", border: "rgba(0,255,204,0.3)", textMuted: "#9ca3af", cardBg: "#09090b" },
    dracula: { bg: "#282a36", fg: "#f8f8f2", accent: "#ff79c6", border: "rgba(255,255,255,0.1)", textMuted: "#6272a4", cardBg: "#44475a" },
    monokai: { bg: "#272822", fg: "#f8f8f2", accent: "#f92672", border: "rgba(255,255,255,0.1)", textMuted: "#75715e", cardBg: "#3e3d32" },
    synthwave: { bg: "#2b213a", fg: "#f9f9f9", accent: "#ff2a6d", border: "rgba(255,42,109,0.3)", textMuted: "#8e7b93", cardBg: "#241b2f" },
    cyberpunk: { bg: "#fced0a", fg: "#000000", accent: "#ff003c", border: "rgba(0,0,0,0.2)", textMuted: "#00000080", cardBg: "#00e6fe" },
    "github-dark": { bg: "#0d1117", fg: "#c9d1d9", accent: "#58a6ff", border: "rgba(240,246,252,0.1)", textMuted: "#8b949e", cardBg: "#161b22" },
  };
  
  const colors = themes[theme] || themes.dark;
  const safeSeed = data.archetype ? data.archetype.replace(/\s+/g, '_') : 'dev';
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 800,
        height: 520,
        backgroundColor: colors.bg,
        color: colors.fg,
        fontFamily: "Inter",
        padding: "36px 40px",
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
          background: `radial-gradient(circle, ${colors.accent}25 0%, transparent 60%)`,
          display: "flex"
        }}
      />
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {data.avatarUrl && (
            <img 
              src={data.avatarUrl} 
              width={80} 
              height={80} 
              style={{ borderRadius: "50%", border: `3px solid ${colors.accent}`, boxShadow: `0 0 20px ${colors.accent}60`, objectFit: "cover" }} 
            />
          )}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: 0, fontSize: "34px", fontWeight: 700 }}>{data.name}</h1>
            <p style={{ margin: 0, fontSize: "18px", color: colors.textMuted }}>@{data.login}</p>
          </div>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", background: `${colors.accent}15`, border: `1px solid ${colors.accent}40`, borderRadius: "100px", padding: "6px 6px 6px 20px", gap: "16px", boxShadow: `0 8px 24px rgba(0,0,0,0.15)` }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 800, marginBottom: "2px" }}>Developer Persona</span>
            <span style={{ fontSize: "20px", fontWeight: 800, color: colors.fg, textShadow: `0 0 10px ${colors.accent}40`, letterSpacing: "-0.5px" }}>{data.archetype}</span>
          </div>
          {data.dicebearAvatar && (
            <div style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`, padding: "4px", borderRadius: "50%", display: "flex", boxShadow: `0 0 16px ${colors.accent}40` }}>
              <img 
                src={data.dicebearAvatar} 
                width={52} 
                height={52} 
                style={{ borderRadius: "50%", background: "transparent" }} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: "flex", gap: "30px", flex: 1, minHeight: 0 }}>
        {/* Left Stats Column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "20px", minHeight: 0 }}>
          {/* Top Languages */}
          <div style={{ display: "flex", flexDirection: "column", background: colors.cardBg, padding: "20px", borderRadius: "16px", border: `1px solid ${colors.border}`, flex: "0 0 auto" }}>
            <h2 style={{ margin: 0, marginBottom: "14px", fontSize: "14px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>Tech Focus</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", lineHeight: 1 }}>
              {data.topLanguages.map(lang => (
                <div key={lang.name} style={{ display: "flex", alignItems: "center", gap: "8px", background: `${colors.accent}15`, color: colors.accent, padding: "6px 12px", borderRadius: "8px", fontSize: "16px", fontWeight: 600, border: `1px solid ${colors.accent}30` }}>
                  {lang.icon ? (
                    <img src={`https://skillicons.dev/icons?i=${lang.icon}`} width={24} height={24} style={{ borderRadius: "4px" }} />
                  ) : (
                    <span style={{ fontSize: "18px", lineHeight: "1", color: colors.accent, paddingRight: "4px" }}>•</span>
                  )}
                  <span style={{ lineHeight: "1" }}>{lang.name}</span>
                </div>
              ))}
              {data.topLanguages.length === 0 && (
                <div style={{ display: "flex", color: colors.textMuted }}>No public repository languages found.</div>
              )}
            </div>
          </div>
          
          {/* Base Stats */}
          <div style={{ display: "flex", flexDirection: "column", background: colors.cardBg, padding: "20px", borderRadius: "16px", border: `1px solid ${colors.border}`, gap: "20px", flex: 1, justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: 700 }}>{data.stats.stars}</span>
                <span style={{ fontSize: "12px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Total Stars</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: 700 }}>{data.stats.commits}</span>
                <span style={{ fontSize: "12px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Commits</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: 700 }}>{data.stats.prs}</span>
                <span style={{ fontSize: "12px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>PRs + Issues</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: colors.accent }}>{data.streak?.longest || 0}</span>
                <span style={{ fontSize: "12px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>Max Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Radar Graph Column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, background: colors.cardBg, padding: "24px", borderRadius: "16px", border: `1px solid ${colors.border}` }}>
          <h2 style={{ margin: 0, marginBottom: "20px", fontSize: "14px", color: colors.textMuted, textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>Personality Map</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "center" }}>
            {data.traits.map(trait => (
              <div key={trait.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px" }}>
                  <span>{trait.label}</span>
                  <span style={{ color: colors.accent }}>{trait.value}%</span>
                </div>
                {/* SVG Progress Bar */}
                <div style={{ display: "flex", width: "100%", height: "8px", background: `${colors.border}`, borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ display: "flex", width: `${trait.value}%`, height: "100%", background: `linear-gradient(90deg, ${colors.accent}80, ${colors.accent})`, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div style={{ position: "absolute", bottom: "16px", right: "24px", display: "flex", fontSize: "14px", color: colors.textMuted, fontWeight: 600, letterSpacing: "1px" }}>
        Generated by DevDNA
      </div>
    </div>
  );
}
