import satori from 'satori';
import { fetchGitHubData } from '../../../lib/github';
import { calculateDeveloperTraits } from '../../../lib/traits';
import DevDNACard from '../../../components/DevDNACard';

export const runtime = 'nodejs';
// CRITICAL: Force dynamic rendering to ensure searchParams are always respected in production (Netlify/Vercel)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Cache fonts in-memory for warm Node.js invocations
let fontDataReg = null;
let fontDataBold = null;

async function loadFonts() {
  if (!fontDataReg) {
    const regRes = await fetch('https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Regular.ttf');
    if (!regRes.ok) throw new Error(`Failed to fetch Regular font: ${regRes.statusText}`);
    fontDataReg = await regRes.arrayBuffer();
  }
  if (!fontDataBold) {
    const boldRes = await fetch('https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Bold.ttf');
    if (!boldRes.ok) throw new Error(`Failed to fetch Bold font: ${boldRes.statusText}`);
    fontDataBold = await boldRes.arrayBuffer();
  }
  return [fontDataReg, fontDataBold];
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters with robust defaults
    const username = searchParams.get('username') || 'torvalds';
    const theme = (searchParams.get('theme') || 'dark').toLowerCase().replace(/_/g, '-');

    // 1. Fetch data
    const rawData = await fetchGitHubData(username);
    const data = calculateDeveloperTraits(rawData);

    // Fetch Avatar from Dicebear
    const safeSeed = data.archetype ? data.archetype.replace(/\s+/g, '_') : 'dev';
    const dicebearUrl = `https://api.dicebear.com/9.x/adventurer/png?seed=${safeSeed}&backgroundColor=transparent`;
    let avatarBase64 = null;
    try {
      const avatarRes = await fetch(dicebearUrl);
      if (avatarRes.ok) {
        const buffer = await avatarRes.arrayBuffer();
        avatarBase64 = `data:image/png;base64,${Buffer.from(buffer).toString('base64')}`;
      }
    } catch (e) {
      console.warn("Dicebear fetch failed:", e);
    }
    data.dicebearAvatar = avatarBase64;

    // 2. Load Fonts
    const [regFont, boldFont] = await loadFonts();

    // 3. Generate SVG using Satori
    const svg = await satori(
      <DevDNACard data={data} theme={theme} />,
      {
        width: 800,
        height: 540,
        fonts: [
          {
            name: 'Inter',
            data: regFont,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: boldFont,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );

    // 4. Send Response with specific headers for Netlify/GitHub README caching
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        // 's-maxage' can sometimes cause issues on Netlify if the CDN doesn't vary by query string correctly
        // Using 'max-age=0' with 's-maxage' ensures the browser doesn't cache, but the CDN can.
        // However, for READMEs, we often want 'stale-while-revalidate'.
        'Cache-Control': 'public, max-age=0, s-maxage=14400, stale-while-revalidate=86400',
        // Tell Netlify to vary the cache by query parameters
        'Netlify-Vary': 'query',
        'Vary': 'Accept-Encoding, Query-String',
      },
    });

  } catch (error) {
    console.error('DevDNA API Error:', error);
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="540" fill="none"><rect width="100%" height="100%" fill="#1a1b23" rx="24"/><text x="50%" y="50%" fill="#ff4c4c" font-size="24" text-anchor="middle" font-family="sans-serif">Error generating DevDNA: ${error.message}</text></svg>`,
      {
        status: 500,
        headers: { 
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
  }
}
