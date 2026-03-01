[![DevDNA](https://thedevdna.vercel.app/api/dev-dna?username=akshitsutharr&theme=dark)](https://thedevdna.vercel.app)

# DevDNA | GitHub Developer Personality Graph

A futuristic, highly aesthetic web platform that analyzes your actual GitHub coding history to generate a stunning, dynamic SVG Profile Card.

DevDNA uses official GitHub GraphQL APIs to analyze your true exact commit count, your PR history, your issue tracking, and your repository statistics. Unlike unauthenticated REST API applications, this graph provides a 100% accurate representation of your GitHub contributions.

## Why Do I Need a Token?
To fetch exactly accurate "Total Commit" and "Total Issue" numbers (the same stats displayed on your official GitHub Profile page), DevDNA must communicate with GitHub's powerful **GraphQL API**. The GraphQL API requires a Personal Access Token (PAT).

Without your token, GitHub will simply not allow applications to read complex historical contribution data accurately.

## How To Run DevDNA

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Generate a GitHub Personal Access Token**
   - Go to [GitHub Developer Settings](https://github.com/settings/tokens/new)
   - Add a Note (e.g., "DevDNA App")
   - Select the `repo` and `read:user` scopes.
   - Click "Generate token" and copy the token (it starts with `ghp_...`).

3. **Add Token to Environment**
   - Rename `.env.example` to `.env.local`
   - Paste your token inside:
     ```env
     GITHUB_TOKEN=ghp_your_personal_access_token_here
     ```

4. **Start the Engine**
   ```bash
   npm run dev
   ```

5. **Generate Your DNA**
   - Open `http://localhost:3000`
   - Enter your GitHub Username.
   - The API will query the GraphQL endpoint using your token and automatically construct your AI Personality Graph!

## Themes Available
- `dark` (Deep Space Aesthetic)
- `light` (Clean Studio Aesthetic)
- `neon` (Cyberpunk Aesthetic)

*Built by Akshit.*
