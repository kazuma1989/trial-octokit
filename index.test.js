// @ts-check
import { Octokit } from "@octokit/rest";
import process from "node:process";
import test from "node:test";
import { script } from "./index.js";

test("Copy an issue", async () => {
  const github = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const { data: issue } = await github.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}",
    {
      owner: "kazuma1989",
      repo: "trial-octokit",
      issue_number: 4,
    }
  );

  await script(github, {
    repo: {
      owner: "kazuma1989",
      repo: "trial-octokit",
    },
    payload: {
      pull_request: {
        number: issue.number,
        title: issue.title,
        labels: issue.labels,
        milestone: issue.milestone,
      },
    },
  });
});
