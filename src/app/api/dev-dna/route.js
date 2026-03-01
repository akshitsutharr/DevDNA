import satori from 'satori';
import { fetchGitHubData } from '../../../lib/github';
import { calculateDeveloperTraits } from '../../../lib/traits';
import DevDNACard from '../../../components/DevDNACard';

export const runtime = 'nodejs';

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
    const username = searchParams.get('username') || 'torvalds';
    const theme = searchParams.get('theme') || 'dark';

    // 1. Fetch data
    const rawData = await fetchGitHubData(username);
    const data = calculateDeveloperTraits(rawData);

    // 2. Load Fonts
    const [regFont, boldFont] = await loadFonts();

    // 3. Generate SVG using Satori
    const svg = await satori(
      <DevDNACard data={data} theme={theme} />,
      {
        width: 800,
        height: 480,
        fonts: [
          {
            name: 'Inter', // Note: We still call it Inter in DevDNACard, but use Roboto under the hood
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

    // 4. Send Response
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        // Cache at the CDN edge for 4 hours
        'Cache-Control': 'public, s-maxage=14400, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('DevDNA API Error:', error);
    return new Response(
      `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" fill="none"><rect width="100%" height="100%" fill="#1a1b23" rx="24"/><text x="50%" y="50%" fill="#ff4c4c" font-size="24" text-anchor="middle" font-family="sans-serif">Error generating DevDNA: ${error.message}</text></svg>`,
      {
        status: 500,
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}
