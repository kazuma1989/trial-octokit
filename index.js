// @ts-check
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
export const script = async (github, context) => {
  const { pull_request } = context.payload;

  const { data } = await github.request("POST /repos/{owner}/{repo}/issues", {
    owner: context.repo.owner,
    repo: context.repo.repo,
    title: `Copy of ${pull_request.title}`,
    body: `
# original

- #${pull_request.number}
`.trim(),
    milestone: pull_request.milestone?.number,
    labels: pull_request.labels,
  });

  // console.log(data);
};
