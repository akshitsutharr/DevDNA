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
  
  // Builder Type (High commits = High Builder)
  const builderScore = Math.min(100, Math.round((commits / 1000) * 100));
  
  // Collaboration Score (PRs + Reviews)
  const collabScore = Math.min(100, Math.round(((prs + reviews) / 200) * 100));
  
  // Open Source Impact (Stars + Followers)
  const impactScore = Math.min(100, Math.round(((stars * 2 + (user.followers?.totalCount || 0) * 5) / 1000) * 100));
  
  // Problem Solving Profile (Issues + PRs)
  const problemSolvingScore = Math.min(100, Math.round(((issues * 2 + prs) / 150) * 100));
  
  // Consistency (Ratio of total compared to arbitrary high bar)
  const consistencyScore = Math.min(100, Math.round((totalContributions / 2500) * 100));

  // Determine Archetype
  let archetype = "Full-Stack Explorer";
  if (builderScore > 80 && collabScore < 40) archetype = "Lone Wolf Architect";
  else if (collabScore > 80 && impactScore > 70) archetype = "Community Pillar";
  else if (problemSolvingScore > 85) archetype = "Bug Hunter Elite";
  else if (impactScore > 90) archetype = "Open Source Legend";
  else if (builderScore > 70 && consistencyScore > 70) archetype = "Relentless Shipper";

  // Normalize scores to ensure radar chart looks good (minimum 20)
  const normalize = (val) => Math.max(20, val || 20);

  return {
    login: user.login,
    name: user.name || user.login,
    avatarUrl: user.avatarUrl,
    topLanguages: langs,
    archetype,
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
