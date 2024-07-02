import "./nano_modules.css";
import NanoModules from "./NanoModules";

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
  let moduleVersion = "...";
  let moduleOutput = "...";
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
  moduleVersion = instance.MODULE_VERSION ? instance.MODULE_VERSION : "-";
  if (instance.MODULE_MAIN && typeof instance.MODULE_MAIN === "function") {
    try {
      moduleOutput = await instance.MODULE_MAIN(updateOutput(modid));
    } catch (error) {
      moduleOutput = `<div class="nano_modules_module_error">${error.code}: ${error.message}</div>`;
    }
  }

  document.getElementById(`nano_module_${modid}_name`).innerHTML = moduleName;
  document.getElementById(`nano_module_${modid}_description`).innerHTML =
    moduleDescription;
  document.getElementById(`nano_module_${modid}_version`).innerHTML =
    moduleVersion;
  document.getElementById(`nano_module_${modid}_output`).innerHTML =
    moduleOutput;
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
  <div class="nano_module_version">
    <span class="bold">Version:</span>
    <span id="nano_module_${modid}_version">${version}</span>
  </div>
  <div class="nano_module_output">
    <span class="bold">Output:</span>
    <div id="nano_module_${modid}_output">${output}</div>
  </div>
</div>
`;
}

function updateOutput(modid) {
  return (newOutput) => {
    const outputContainer = document.getElementById(
      "nano_module_" + modid + "_output"
    );
    outputContainer.innerHTML = newOutput;
  };
}
