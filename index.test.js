import { Octokit } from "@octokit/rest";
import process from "node:process";
import test from "node:test";
import { script } from "./index.js";

test("", async () => {
  const github = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const labels = await script(github, {
    repo: {
      owner: "kazuma1989",
      repo: "trial-octokit",
    },
  });

  console.log(labels)
});
