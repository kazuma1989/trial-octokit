/**
 * @param {import("@octokit/rest").Octokit} github
 * @param {{
 *  repo: {
 *    owner: string
 *    repo: string
 * }
 * }} context
 */
export const script = async (github, context) => {
  console.log(context);

  const { data } = await github.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}",
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: 1,
    }
  );

  return data.labels;
};
