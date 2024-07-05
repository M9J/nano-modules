import "./nano-modules.css";
import NanoModules from "./NanoModules";
import { BADGES } from "./github-helper";

function component() {
  const container = document.createElement("div");
  container.classList.add("nano_modules_container");

  const title = document.createElement("div");
  title.classList.add("nano_modules_title");
  title.innerHTML = "nano_modules";

  const modules = document.createElement("div");
  modules.classList.add("nano_modules_modules");
  modules.id = "nano_modules_modules";

  container.appendChild(title);
  container.appendChild(modules);

  container.appendChild(createFooter());
  return container;
}

document.body.appendChild(component());

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
    if (module) {
      loadModule(module, modid);
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

async function loadModule(module, modid) {
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
  if (instance.MODULE_MAIN && typeof instance.MODULE_MAIN === "function") {
    try {
      await instance.MODULE_MAIN();
    } catch (error) {
      instance.MODULE_OUTPUT.print(`ERROR: ${error.code}: ${error.message}`);
    }
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
    &nbsp;<span
      class="pulse hidden"
      id="nano_module_${modid}_pulse"
    ></span><span class="expander">&nbsp;</span>
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
    const logContainer = document.createElement("div");
    logContainer.classList.add(`nano_module_log`);
    logContainer.innerHTML = newOutput;
    outputContainer.prepend(logContainer);
  };
}

const MAIL_SEND_DELAY = 100;

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

function createFooter() {
  const footer = document.createElement("div");
  footer.classList.add("nano_modules_footer");

  footer.innerHTML = `
<div class="nano_modules_footer_row">
  <a class="github-badge" href="https://github.com/m9j/nano-modules/actions">
    <div class="github-badge-label">nano-modules</div>
    <div class="github-badge-stage">ACTIONS</div>
    <div class="github-badge-status">PASSED</div>
  </a>
</div>
<div class="nano_modules_footer_row">
  <a class="github-badge" href="https://github.com/m9j/nano_modules/actions">
    <div class="github-badge-label">nano_modules</div>
    <div class="github-badge-stage">ACTIONS</div>
    <div class="github-badge-status">PASSED</div>
  </a>
</div>
  `;

  return footer;
}
