import "server-only";

import { githubRequest } from "@/src/lib/github/client";
import { getGitHubEnv } from "@/src/lib/env/server";

type GitHubContentResponse = {
  sha: string;
  content: string;
  encoding: "base64";
};

type GitHubUpdateResponse = {
  content: {
    sha: string;
    path: string;
  };
  commit: {
    sha: string;
    html_url: string;
  };
};

function toBase64(value: string): string {
  return Buffer.from(value, "utf8").toString("base64");
}

function fromBase64(value: string): string {
  return Buffer.from(value.replace(/\n/g, ""), "base64").toString("utf8");
}

export async function readJsonFromGitHub<T>(path: string): Promise<{ data: T; sha: string }> {
  const { branch } = getGitHubEnv();
  const file = await githubRequest<GitHubContentResponse>({
    path: `/contents/${path}?ref=${encodeURIComponent(branch)}`,
    method: "GET",
  });
  const decoded = fromBase64(file.content);
  return {
    data: JSON.parse(decoded) as T,
    sha: file.sha,
  };
}

export async function updateJsonOnGitHub<T>(options: {
  path: string;
  data: T;
  sha: string;
  message: string;
}): Promise<{ commitSha: string; commitUrl: string }> {
  const { branch } = getGitHubEnv();
  const body = {
    message: options.message,
    content: toBase64(JSON.stringify(options.data, null, 2)),
    sha: options.sha,
    branch,
  };

  const response = await githubRequest<GitHubUpdateResponse>({
    path: `/contents/${options.path}`,
    method: "PUT",
    body: JSON.stringify(body),
  });

  return {
    commitSha: response.commit.sha,
    commitUrl: response.commit.html_url,
  };
}
