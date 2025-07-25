import fetch from 'node-fetch';
import { format, subDays } from 'date-fns';

export const getTrendingRepos = async (req, res, next) => {
  try {
    const oneWeekAgo = subDays(new Date(), 7);
    const dateString = format(oneWeekAgo, 'yyyy-MM-dd');
    const apiUrl = `https://api.github.com/search/repositories?q=created:>${dateString}&sort=stars&order=desc&per_page=10`;

    const response = await fetch(apiUrl, {
      headers: { 'User-Agent': 'intern-demo' }
    });
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const json = await response.json();

    const simplified = json.items.map(repo => ({
      name: repo.name,
      author: repo.owner.login,
      description: repo.description,
      stars: repo.stargazers_count,
      url: repo.html_url
    }));

    res.json(simplified);
  } catch (err) {
    next(err);
  }
};
