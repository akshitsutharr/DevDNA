export function getSkillIcon(language) {
  if (!language) return null;
  const map = {
    'c++': 'cpp',
    'c#': 'cs',
    'f#': 'fs',
    'jupyter notebook': 'py', // Fallback to python for DS
    'html': 'html',
    'css': 'css',
    'javascript': 'js',
    'typescript': 'ts',
    'vue': 'vue',
    'react': 'react',
    'python': 'py',
    'rust': 'rust',
    'go': 'go',
    'ruby': 'ruby',
    'java': 'java',
    'php': 'php',
    'kotlin': 'kotlin',
    'swift': 'swift',
    'dart': 'dart',
    'scala': 'scala',
    'shell': 'bash',
    'powershell': 'powershell',
    'c': 'c',
    'objective-c': 'objc',
    'lua': 'lua',
    'r': 'r',
    'elixir': 'elixir',
    'haskell': 'haskell',
    'clojure': 'clojure',
    'ocaml': 'ocaml',
    'julia': 'julia',
    'zig': 'zig',
    'nim': 'nim',
    'solidity': 'solidity',
    'astro': 'astro',
    'svelte': 'svelte'
  };
  const key = language.toLowerCase();
  return map[key] || null;
}

function generateArchetype(builderScore, collabScore, impactScore, problemSolvingScore, consistencyScore, topLanguage, user) {
  const adjectives = [];
  if (builderScore > 75) adjectives.push("Relentless", "Prolific", "Chaos");
  if (collabScore > 75) adjectives.push("Empathetic", "Harmonious", "Synergistic");
  if (impactScore > 75) adjectives.push("Stellar", "Cosmic", "Vanguard", "Mystic");
  if (problemSolvingScore > 75) adjectives.push("Zen", "Analytical", "Surgical");
  if (consistencyScore > 75) adjectives.push("Unbreakable", "Eternal", "Iron");
  
  if (adjectives.length === 0) adjectives.push("Curious", "Wandering", "Versatile", "Nomadic", "Lucid");
  
  // Seed based on user data so it's consistent for the same stats
  const seed = (user.followers?.totalCount || 0) + builderScore + problemSolvingScore;
  const adj = adjectives[seed % adjectives.length];
  
  const nouns = [];
  if (builderScore > 80 && collabScore < 40) nouns.push("Lone Wolf", "Architect", "Hermit", "Phantom");
  else if (collabScore > 80 && impactScore > 70) nouns.push("Pillar", "Diplomat", "Leader", "Nexus");
  else if (problemSolvingScore > 85) nouns.push("Bug Hunter", "Sniper", "Detective", "Oracle");
  else if (impactScore > 90) nouns.push("Icon", "Legend", "Prophet", "Titan");
  else if (builderScore > 70 && consistencyScore > 70) nouns.push("Shipper", "Machine", "Juggernaut");
  else nouns.push("Explorer", "Crafter", "Artisan", "Engineer", "Maverick");

  const noun = nouns[(seed * 2 + collabScore) % nouns.length];
  
  const langModifierMap = {
    'javascript': 'Web', 'typescript': 'Web', 'html': 'UI', 'css': 'Style',
    'python': 'Data', 'jupyter notebook': 'Data',
    'c++': 'System', 'c': 'System', 'rust': 'Memory', 'go': 'Cloud',
    'java': 'Enterprise', 'c#': 'Enterprise',
    'ruby': 'Rails', 'php': 'Server',
    'swift': 'Apple', 'kotlin': 'Android',
    'shell': 'Terminal', 'bash': 'Terminal'
  };
  
  let modifier = "Code";
  if (topLanguage) {
    modifier = langModifierMap[topLanguage.toLowerCase()] || topLanguage;
  }
  
  return `${adj} ${modifier} ${noun}`;
}

export function calculateDeveloperTraits(user) {
  if (!user) return null;

  // 1. Analyze Languages (Tech Focus)
  const langMap = {};
  let totalSize = 0;
  user.repositories?.nodes?.forEach(repo => {
    repo.languages?.edges?.forEach(edge => {
      langMap[edge.node.name] = (langMap[edge.node.name] || 0) + edge.size;
      totalSize += edge.size;
    });
  });
  
  const langs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(l => l[0]);

  // 2. Contributions
  const contribs = user.contributionsCollection || {};
  const commits = contribs.totalCommitContributions || 0;
  const prs = contribs.totalPullRequestContributions || 0;
  const issues = contribs.totalIssueContributions || 0;
  const reviews = contribs.totalPullRequestReviewContributions || 0;
  const totalContributions = commits + prs + issues + reviews;

  // 3. Stars & Popularity
  const stars = user.repositories?.nodes?.reduce((acc, repo) => acc + (repo.stargazerCount || 0), 0) || 0;
  
  // Calculate specific 0-100 traits
  const builderScore = Math.min(100, Math.round((commits / 1000) * 100));
  const collabScore = Math.min(100, Math.round(((prs + reviews) / 200) * 100));
  const impactScore = Math.min(100, Math.round(((stars * 2 + (user.followers?.totalCount || 0) * 5) / 1000) * 100));
  const problemSolvingScore = Math.min(100, Math.round(((issues * 2 + prs) / 150) * 100));
  const consistencyScore = Math.min(100, Math.round((totalContributions / 2500) * 100));

  const archetype = generateArchetype(
    builderScore, collabScore, impactScore, problemSolvingScore, consistencyScore, langs[0], user
  );

  const normalize = (val) => Math.max(20, val || 20);

  // Map to objects containing icon info
  const enrichedLangs = langs.map(l => ({
    name: l,
    icon: getSkillIcon(l)
  }));

  return {
    login: user.login,
    name: user.name || user.login,
    avatarUrl: user.avatarUrl,
    topLanguages: enrichedLangs,
    archetype,
    streak: user.streak || { longest: 0, current: 0 },
    stats: {
      stars,
      commits,
      prs,
    },
    traits: [
      { label: "Builder", value: normalize(builderScore) },
      { label: "Collaborator", value: normalize(collabScore) },
      { label: "Impact", value: normalize(impactScore) },
      { label: "Problem Solver", value: normalize(problemSolvingScore) },
      { label: "Consistency", value: normalize(consistencyScore) },
    ]
  };
}
