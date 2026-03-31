<!--
DevDNA — README (2026)
Repo: akshitsutharr/DevDNA
-->

<div align="center">

<!-- Title / Hero -->
<h1>DevDNA</h1>
<p><b>GitHub Developer Personality Graph</b> — generate a futuristic, embeddable SVG “DNA card” from real GitHub contribution data.</p>

<!-- Badges -->
<p>
  <a href="https://github.com/akshitsutharr/DevDNA/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/akshitsutharr/DevDNA?style=for-the-badge"></a>
  <a href="https://github.com/akshitsutharr/DevDNA/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/akshitsutharr/DevDNA?style=for-the-badge"></a>
  <a href="https://github.com/akshitsutharr/DevDNA/issues"><img alt="Issues" src="https://img.shields.io/github/issues/akshitsutharr/DevDNA?style=for-the-badge"></a>
  <a href="https://github.com/akshitsutharr/DevDNA/blob/main/LICENSE"><img alt="LICENSE" src="https://img.shields.io/github/license/akshitsutharr/DevDNA?style=for-the-badge"></a>
  <a href="https://github.com/akshitsutharr/DevDNA/commits/main"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/akshitsutharr/DevDNA?style=for-the-badge"></a>
</p>

<!-- Tech badges -->
<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs">
  <img alt="React" src="https://img.shields.io/badge/React-19-087ea4?style=for-the-badge&logo=react">
  <img alt="GraphQL" src="https://img.shields.io/badge/GitHub%20GraphQL-API-181717?style=for-the-badge&logo=github">
  <img alt="Satori" src="https://img.shields.io/badge/Satori-SVG%20Rendering-6b4cff?style=for-the-badge">
</p>
  <a href="https://www.producthunt.com/products/devdna?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-devdna" target="_blank" rel="noopener noreferrer"><img alt="DevDNA - Turn your GitHub activity into a Developer Personality Card | Product Hunt" width="230" height="44" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1087860&amp;theme=light&amp;t=1772631503574"></a>
</br>
</br>
<!-- Card preview -->
<table align="center">
  <tr>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=dark" width="400"/></td>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=light" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=neon" width="400"/></td>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=dracula" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=monokai" width="400"/></td>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=synthwave" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=cyberpunk" width="400"/></td>
    <td><img src="https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=github-dark" width="400"/></td>
  </tr>
</table>
<br/>

<!-- Quick links -->
<p>
  <a href="#-what-is-devdna">What is DevDNA?</a> •
  <a href="#-features">Features</a> •
  <a href="#-how-it-works">How it works</a> •
  <a href="#-api-usage">API usage</a> •
  <a href="#-local-development">Local development</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-security--privacy">Security & privacy</a>
</p>

</div>

---

## ✨ What is DevDNA?

**DevDNA** is a modern Next.js app that generates a **dynamic SVG profile card** (an “AI-styled developer personality graph”) by analyzing a developer’s **real GitHub history** using the **official GitHub GraphQL API**.

Unlike simple REST-based widgets, DevDNA is built to fetch **accurate** totals and derive “traits” (Builder, Collaborator, Impact, Problem Solver, Consistency) and an archetype label (e.g. *Relentless Shipper*, *Bug Hunter Elite*).

---

## 🧩 Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🧬 SVG DevDNA Card</h3>
      <p>Generates an embeddable <b>image/svg+xml</b> card that can be used in README files, profiles, or websites.</p>
      <ul>
        <li>Fast to embed</li>
        <li>Looks great in dark GitHub UI</li>
        <li>Shareable & linkable</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📊 Real GitHub Stats (GraphQL)</h3>
      <p>Uses GitHub’s GraphQL API so totals align with GitHub’s own contribution view.</p>
      <ul>
        <li>Commit contribution totals across years</li>
        <li>PR counts + issue counts</li>
        <li>Repo stats (stars, topics, languages)</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td width="50%" valign="top">
      <h3>🎨 Themes</h3>
      <p>Switch card aesthetics via query params:</p>
      <ul>
        <li><code>dark</code> — deep space</li>
        <li><code>light</code> — clean studio</li>
        <li><code>neon</code> — cyberpunk</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🧱 Modern Stack</h3>
      <ul>
        <li><b>Next.js</b> (App Router)</li>
        <li><b>React</b></li>
        <li><b>Satori</b> for SVG rendering</li>
        <li><b>Lucide</b> icons in the UI</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🧠 How it works

### 1) Client UI (Generator page)
The homepage provides a simple form to choose:
- `username`
- `theme`

It then previews the SVG by pointing an `<img>` at:

```
/api/dev-dna?username=<user>&theme=<theme>
```

### 2) API route generates the SVG
The API endpoint is implemented using Next.js route handlers:

- `GET /api/dev-dna`
- It fetches GitHub data via GraphQL
- It computes “traits” and an archetype
- It renders the final SVG using **Satori** + a React component card layout

### 3) Traits calculation
DevDNA derives a personality-like summary from:
- commits / PRs / issues
- stars + follower count
- language distribution (top languages)

---

## 🖼 API usage

### Endpoint
```
GET /api/dev-dna?username=<github_login>&theme=<theme>
```

### Parameters
- `username` *(string, optional)*: GitHub login. Defaults to `torvalds`.
- `theme` *(string, optional)*: `dark` | `light` | `neon`. Defaults to `dark`.

### Example URLs
- Dark:
  - `https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=dark`
- Light:
  - `https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=light`
- Neon:
  - `https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=neon`

### Embed in a README (Markdown)
```md
[![DevDNA](https://thedevdna.vercel.app/api/dev-dna?username=YOUR_USERNAME&theme=dark)](https://thedevdna.vercel.app)
```

---

## 🧑‍💻 Local development

### Prerequisites
- Node.js (recommended: latest LTS)
- A GitHub Personal Access Token (PAT) for GraphQL

### Install
```bash
npm install
```

### Configure environment variables
Create `.env.local` in the project root:

```env
GITHUB_TOKEN=ghp_your_personal_access_token_here
```

### Run dev server
```bash
npm run dev
```

Open:
- http://localhost:3000

---

## ⚙️ Configuration

### Environment variables

| Variable | Required | Description |
|---------|----------|-------------|
| `GITHUB_TOKEN` | ✅ | GitHub PAT used to call the GitHub GraphQL API. |

### Why a token is required
GitHub’s GraphQL API requires authentication for reliable contribution and history queries. DevDNA uses the token to fetch accurate totals (commits/issues/PRs), and to avoid anonymous API limitations.

---

## 🎭 Themes

Use the `theme` query parameter:

- `dark` — deep space look (default)
- `light` — minimal bright layout
- `neon` — high-contrast cyberpunk accent

Example:
```
/api/dev-dna?username=torvalds&theme=neon
```

---

## 🧱 Project structure

> High-level layout (App Router):

- `src/app/` — Next.js app router pages, layout, global styles
- `src/app/api/dev-dna/route.js` — SVG generation endpoint
- `src/lib/` — GitHub GraphQL fetch + trait calculation logic
- `src/components/` — SVG card React component rendered by Satori

---

## 🛡 Security & privacy

### Important notes
- **Do not expose** your `GITHUB_TOKEN` to the browser.
- DevDNA reads `GITHUB_TOKEN` on the server (API route) using `process.env`.
- Prefer a token with the minimum necessary scopes.

### Recommended token scopes
This project typically needs:
- `read:user`
- `repo` *(only if needed for private repo insights; for public-only data you may be able to reduce scopes)*

---

## 🧾 Caching

The SVG response is served with edge-friendly caching headers:

- `Cache-Control: public, s-maxage=14400, stale-while-revalidate=86400`

This helps the card load quickly when embedded across GitHub READMEs.

---

## 🗺 Roadmap ideas (optional)

- More themes (glass, mono, sunset)
- “Compact” card size variant (e.g. 600×360)
- Additional traits (reviews, discussions, community)
- Rate-limit safe batching + backoff
- Optional unauthenticated mode with graceful fallback (less accurate)

---

## 🤝 Contributing

PRs and suggestions are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit with clear messages
4. Open a Pull Request

---

## 📄 License
[![License: Open Source](https://img.shields.io/badge/DevDNA-License%20Open%20Source-0ea5e9?style=for-the-badge)](https://github.com/akshitsutharr/DevDNA/blob/main/LICENSE)

---

<div align="center">
  <p>Built with Next.js + GitHub GraphQL + Satori.</p>
</div>
