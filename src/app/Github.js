// https://api.github.com/repos/M9J/nano-modules/actions/workflows/actions.yml/runs

export const BADGES = {
  "nano-modules": {
    build:
      "https://github.com/M9J/nano-modules/actions/workflows/actions.yml/badge.svg",
    deploy:
      "https://github.com/M9J/nano-modules/actions/workflows/pages/pages-build-deployment/badge.svg",
  },
  nano_modules: {
    build:
      "https://github.com/M9J/nano_modules/actions/workflows/actions.yml/badge.svg",
    deploy:
      "https://github.com/M9J/nano_modules/actions/workflows/pages/pages-build-deployment/badge.svg",
  },
};

export const WORKFLOW_API_URLS = {
  "nano-modules": {
    build:
      "https://api.github.com/repos/M9J/nano-modules/actions/workflows/actions.yml/runs",
    deploy:
      "https://api.github.com/repos/M9J/nano-modules/actions/workflows/pages/pages-build-deployment/runs",
  },
  nano_modules: {
    build:
      "https://api.github.com/repos/M9J/nano_modules/actions/workflows/actions.yml/runs",
    deploy:
      "https://api.github.com/repos/M9J/nano_modules/actions/workflows/pages/pages-build-deployment/runs",
  },
};

export async function getWorkflowStatus(URL) {
  if (URL) {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("response", data);
    const workflowRuns = data.workflow_runs;
    const hasWorkflowRuns = Array.isArray(workflowRuns)
      ? workflowRuns.length > 0
      : false;
    if (hasWorkflowRuns) {
      const lastAction = workflowRuns[0];
      return {
        status: lastAction.status,
        conclusion: lastAction.conclusion,
      };
    }
  }
}
