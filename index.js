// @ts-check
import * as fs from "node:fs/promises";

/**
 * @param {import("@octokit/rest").Octokit} github
 * @param {{
 *  repo: {
 *    owner: string
 *    repo: string
 *  }
 *  payload: {
 *    pull_request: {
 *      number: number
 *      title: string
 *      labels: string[]
 *      milestone: {
 *        number: number
 *      } | null
 *    }
 *  }
 * }} context
 */
export async function script(github, context) {
  const {
    repo: { owner, repo },
    payload: { pull_request },
  } = context;

  const FRONT_MATTER = /^\s*---[\s\S]*?---\s*/;

  let issueTemplate = await fs.readFile(
    "./.github/ISSUE_TEMPLATE/dev-team-qa.md",
    "utf-8"
  );
  issueTemplate = issueTemplate.replace(FRONT_MATTER, "");

  const { data } = await github.request("POST /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    title: `Copy of ${pull_request.title}`,
    body: issueTemplate.replaceAll(
      "{{pull_request_ref}}",
      `#${pull_request.number}`
    ),
    milestone: pull_request.milestone?.number,
    labels: pull_request.labels,
  });

  // console.log(data);
}
