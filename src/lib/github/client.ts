import "server-only";

import { getGitHubEnv } from "@/src/lib/env/server";

type GitHubRequestOptions = RequestInit & {
  path: string;
};

const GITHUB_API_BASE = "https://api.github.com";

export async function githubRequest<T>(options: GitHubRequestOptions): Promise<T> {
  const { token, owner, repo } = getGitHubEnv();
  const { path, headers, ...rest } = options;
  const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}${path}`, {
    ...rest,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "companeros-jbk-admin-cms",
      ...headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}
