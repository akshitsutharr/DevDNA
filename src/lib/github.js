export async function fetchGitHubData(username) {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    throw new Error("GITHUB_TOKEN is missing. Please create a .env.local file. See README.md for instructions.");
  }

  // To get TRUE total commits like github-readme-streak-stats, we must query the user's entire history.
  // We first fetch their account creation date, then we can query the total contributions.
  const profileQuery = `
    query userInfo($login: String!) {
      user(login: $login) {
        name
        login
        avatarUrl
        createdAt
        followers { totalCount }
        pullRequests(first: 1) { totalCount }
        issues(first: 1) { totalCount }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            stargazerCount
            forkCount
            repositoryTopics(first: 5) { nodes { topic { name } } }
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              edges { size node { name color } }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: profileQuery, variables: { login: username } }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error(`GitHub GraphQL API returned ${response.status}: ${response.statusText}`);
    const data = await response.json();
    if (data.errors) throw new Error(data.errors[0]?.message || "GraphQL Error");
    
    const user = data.data.user;
    const createdAt = new Date(user.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();
    
    // Now we must recursively fetch contribution calendars for EVERY year they've been on GitHub
    let absoluteTotalCommits = 0;
    
    // To respect rate limits and speed, we will batch these year queries into one giant GraphQL request dynamically
    let yearsQuery = `query contributionYears($login: String!) { user(login: $login) {`;
    for (let year = createdAt; year <= currentYear; year++) {
      yearsQuery += `
        year${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          contributionCalendar { totalContributions }
        }
      `;
    }
    yearsQuery += `} }`;

    const yearsResponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: yearsQuery, variables: { login: username } }),
      next: { revalidate: 3600 }
    });
    
    if (yearsResponse.ok) {
       const yearsData = await yearsResponse.json();
       if (yearsData.data && yearsData.data.user) {
         Object.values(yearsData.data.user).forEach(collection => {
            if (collection && collection.contributionCalendar) {
               absoluteTotalCommits += collection.contributionCalendar.totalContributions;
            }
         });
       }
    }

    // We manually remap it so our frontend traits parser still works flawlessly.
    return {
      login: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatarUrl,
      followers: user.followers,
      pullRequests: user.pullRequests,
      contributionsCollection: {
        totalCommitContributions: absoluteTotalCommits, // TRUE historical aggregate
        totalIssueContributions: user.issues?.totalCount || 0,
        totalPullRequestContributions: user.pullRequests?.totalCount || 0,
        totalPullRequestReviewContributions: 0,
        restrictedContributionsCount: 0
      },
      repositories: user.repositories
    };

  } catch (error) {
    console.error("Failed to fetch exact GitHub Data from GraphQL:", error);
    throw new Error("DevDNA requires a valid GITHUB_TOKEN to fetch real exact data.");
  }
}
