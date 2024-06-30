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
  let modid = 0;
  for (const module of nanoModules) {
    if (module) {
      const instance = new module();
      const moduleName = instance.MODULE_NAME ? instance.MODULE_NAME : "";
      const moduleDescription = instance.MODULE_DESCRIPTION
        ? instance.MODULE_DESCRIPTION
        : "";
      const moduleVersion = instance.MODULE_VERSION
        ? instance.MODULE_VERSION
        : "";
      let moduleOutput = "";
      if (instance.MODULE_MAIN && typeof instance.MODULE_MAIN === "function") {
        try {
          moduleOutput = await instance.MODULE_MAIN(updateOutput(++modid));
        } catch (error) {
          moduleOutput = `<div class="nano_modules_module_error">${error.code}: ${error.message}</div>`;
        }
      }
      const template = buildTemplate(
        moduleName,
        moduleDescription,
        moduleVersion,
        moduleOutput,
        modid
      );
      nanoModulesModuleContainer.innerHTML += template;
    }
  }
}

function buildTemplate(name, description, version, output, modid) {
  return `<div class="nano_modules_module">
      <div class="nano_module_name"><span class="bold">Name:</span> ${name}</div>
      <div class="nano_module_description"><span class="bold">Description:</span> ${description}</div>
      <div class="nano_module_version"><span class="bold">Version:</span> ${version}</div>
      <div class="nano_module_output"><span class="bold">Output:</span><div class="nano_module_output_content" id="mod_${modid}">${output}</div></div>
  </div>`;
}

function updateOutput(modid) {
  return (newOutput) => {
    const outputContainer = document.getElementById("mod_" + modid);
    outputContainer.innerHTML = newOutput;
  };
}
