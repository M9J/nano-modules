import "./nano-modules.css";
import NanoModules from "./app/NanoModules";
import { getWorkflowStatus, WORKFLOW_API_URLS } from "./app/Github";

const comp = await component();
document.body.appendChild(comp);
loadNanoModules();
checkAndUpdateGithubWorkflowStatus();

const nanoMetaModules = [];

async function loadNanoModules() {
  const nanoModules = await NanoModules();
  if (nanoModules) {
    const nanoModulesModuleContainer = document.getElementById(
      "nano_modules_modules"
    );
    if (nanoModules.length > 0) nanoModulesModuleContainer.innerHTML = "";
    else
      nanoModulesModuleContainer.innerHTML =
        "<div class='nano_modules_no_modules'>No Modules found</div>";
    for (const [modid, module] of nanoModules.entries()) {
      if (module) await setupMetaModule(module, modid);
    }
    for (const module of nanoMetaModules) {
      if (module) await execModule(module);
    }
  }
}

async function setupMetaModule(module, modid) {
  let moduleName = getTempPlaceholderModuleName(module);
  let moduleDescription = "...";
  let modulePulse = false;
  let moduleVersion = "...";
  let moduleOutput = "";
  const templateLoading = buildTemplate(
    moduleName,
    moduleDescription,
    moduleVersion,
    moduleOutput,
    modid
  );
  const nanoModulesModuleContainer = document.getElementById(
    "nano_modules_modules"
  );
  nanoModulesModuleContainer.innerHTML += templateLoading;
  const moduleClass = await module();
  const instance = new moduleClass.default();
  moduleName = instance.MODULE_NAME ? instance.MODULE_NAME : "-";
  moduleDescription = instance.MODULE_DESCRIPTION
    ? instance.MODULE_DESCRIPTION
    : "-";
  modulePulse = instance.MODULE_PULSE || false;
  moduleVersion = instance.MODULE_VERSION ? instance.MODULE_VERSION : "-";
  const moduleMailId = instance.MODULE_MAIL_ID || null;
  const moduleMailHandler = instance.MODULE_MAIL_HANDLER || null;
  instance.MODULE_OUTPUT = createOutputModifiers(modid);
  if (moduleMailId && moduleMailHandler) {
    mail.onReceive(moduleMailId, moduleMailHandler);
    instance.MODULE_MAIL = { send: mail.send };
  }
  document.getElementById(`nano_module_${modid}_name`).innerHTML = moduleName;
  document.getElementById(`nano_module_${modid}_description`).innerHTML =
    moduleDescription;
  document.getElementById(`nano_module_${modid}_version`).innerHTML =
    moduleVersion;
  if (modulePulse) {
    document
      .getElementById(`nano_module_${modid}_pulse`)
      .classList.remove("hidden");
  }
  instance.MODULE_ID = modid;
  nanoMetaModules.push(instance);
}

async function execModule(module) {
  if (module.MODULE_MAIN && typeof module.MODULE_MAIN === "function") {
    try {
      await module.MODULE_MAIN();
    } catch (error) {
      module.MODULE_OUTPUT.print(`ERROR: ${error.code}: ${error.message}`);
    }
  }
}

function getTempPlaceholderModuleName(moduleName) {
  if (moduleName)
    return moduleName
      .toString()
      .replaceAll("() => import(", "")
      .replaceAll(")", "")
      .replaceAll('"', "");
}

async function component() {
  const container = document.createElement("div");
  container.classList.add("nano_modules_container");

  const title = document.createElement("div");
  title.classList.add("nano_modules_title");
  title.innerHTML = "NanoModules";

  const workflowStatus = document.createElement("div");
  const workflow1 = document.createElement("div");
  workflow1.classList.add("workflow-status");
  workflow1.id = "workflow-status-nano-modules";
  workflowStatus.appendChild(workflow1);
  const workflow2 = document.createElement("div");
  workflow2.classList.add("workflow-status");
  workflow2.id = "workflow-status-nano_modules";
  workflowStatus.appendChild(workflow2);

  title.appendChild(workflowStatus);

  const modules = document.createElement("div");
  modules.classList.add("nano_modules_modules");
  modules.id = "nano_modules_modules";

  container.appendChild(title);
  container.appendChild(modules);

  const footer = await createFooter();
  container.appendChild(footer);
  return container;
}

function buildTemplate(name, description, version, output, modid) {
  return `
  <div class="nano_modules_module" id="nano_module_${modid}">
    <div class="nano_module_name">
      <span class="bold">Name:</span>
      <span id="nano_module_${modid}_name">${name}</span>
    </div>
    <div class="nano_module_description">
      <span class="bold">Description:</span>
      <span id="nano_module_${modid}_description">${description}</span>
    </div>
    <div class="nano_module_output">
      <span class="bold">Output:</span>
      <span id="nano_module_${modid}_pulse" class="pulse hidden">
        &nbsp;<span class="pulse_dot"></span>
      </span>
      <span class="expander">&nbsp;</span>
      <span class="bold">Version:</span>
      <span id="nano_module_${modid}_version">${version} </span>
    </div>
    <div
      class="nano_module_output_restricted_scrollable"
      id="nano_module_${modid}_output"
    >
      ${output}
    </div>
  </div>
  `;
}

const mail = createMail();

function createOutputModifiers(modid) {
  return {
    print: print(modid),
    printLine: printLine(modid),
  };
}

function print(modid) {
  return (newOutput) => {
    const outputContainer = document.getElementById(
      `nano_module_${modid}_output`
    );
    outputContainer.innerHTML = newOutput;
  };
}

function printLine(modid) {
  return (newOutput) => {
    const outputContainer = document.getElementById(
      `nano_module_${modid}_output`
    );
    outputContainer.prepend(newOutput, document.createElement("br"));
  };
}

const MAIL_SEND_DELAY = 0;

function createMail() {
  const recipients = {};
  const onReceive = (mailId, mailHandler) => {
    if (!recipients[mailId]) recipients[mailId] = mailHandler;
  };
  const send = (mail) => {
    let tmr = setTimeout(() => {
      clearTimeout(tmr);
      if (!recipients[mail.to]) console.log(`Recipient not found: ${mail.to}`);
      else recipients[mail.to](mail);
    }, MAIL_SEND_DELAY);
  };
  return { onReceive, send };
}

async function createFooter() {
  const footer = document.createElement("div");
  footer.classList.add("nano_modules_footer");

  footer.innerHTML = `
    <div class="nano_modules_footer_row">
      <a class="github-badge" href="https://github.com/m9j/nano-modules/actions">
        <div class="github-badge-label">nano-modules</div>
        <div class="github-badge-stage">ACTIONS</div>
        <!-- <div class="github-badge-status"></div> -->
      </a>
    </div>
    <div class="nano_modules_footer_row">
      <a class="github-badge" href="https://github.com/m9j/nano_modules/actions">
        <div class="github-badge-label">nano_modules</div>
        <div class="github-badge-stage">ACTIONS</div>
        <!-- <div class="github-badge-status"></div> -->
      </a>
    </div>
  `;

  return footer;
}

async function checkAndUpdateGithubWorkflowStatus() {
  const STATUS_QUEUED = "queued";
  const CONCLUSION_SUCCESS = "success";
  const CONCLUSION_FAILURE = "failure";
  const { status: nmStatus, conclusion: nmConclusion } =
    await getWorkflowStatus(WORKFLOW_API_URLS["nano-modules"].build);
  const nmElem = document.getElementById("workflow-status-nano-modules");
  nmElem.classList.remove([
    "workflow-status-success",
    "workflow-status-failed",
    "workflow-status-progressing",
  ]);
  if (nmConclusion === CONCLUSION_SUCCESS) {
    nmElem.classList.add("workflow-status-success");
  } else if (nmConclusion === CONCLUSION_FAILURE) {
    nmElem.classList.add("workflow-status-failed");
  } else if (nmStatus === STATUS_QUEUED) {
    nmElem.classList.add("workflow-status-progressing");
  }
  const { status: n_mStatus, conclusion: n_mConclusion } =
    await getWorkflowStatus(WORKFLOW_API_URLS["nano_modules"].build);
  const n_mElem = document.getElementById("workflow-status-nano_modules");
  n_mElem.classList.remove([
    "workflow-status-success",
    "workflow-status-failed",
    "workflow-status-progressing",
  ]);
  if (n_mConclusion === CONCLUSION_SUCCESS) {
    n_mElem.classList.add("workflow-status-success");
  } else if (n_mConclusion === CONCLUSION_FAILURE) {
    n_mElem.classList.add("workflow-status-failed");
  } else if (n_mStatus === STATUS_QUEUED) {
    n_mElem.classList.add("workflow-status-progressing");
  }
}
