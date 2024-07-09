import Module from "../Components/Module";
import Modules from "../Components/Modules";
import NanoMail from "./NanoMail";
import NanoOutput from "./NanoOutput";

const NANOMODULES_URL_DEV = "../nano_modules/index.js";
const NANOMODULES_URL_PROD = "https://M9J.github.io/nano_modules/index.js";
const METAMODULES = [];
const nanoMail = new NanoMail();

export default async function () {
  console.log("> Nanomod.js _");
  const { NanoModuleLoader, NanoModulesIndex } = await fetchNanoModules();
  if (NanoModulesIndex) {
    const nanoModulesModuleContainer = document.getElementById(
      "nano_modules_modules"
    );
    if (NanoModulesIndex.length > 0) nanoModulesModuleContainer.innerHTML = "";
    else
      nanoModulesModuleContainer.innerHTML =
        "<div class='nano_modules_no_modules'>No Modules found</div>";
    for (const [modid, nanoModulePath] of NanoModulesIndex.entries()) {
      if (nanoModulePath)
        await setupMetaModule(modid, {
          modulePath: nanoModulePath,
          moduleLoader: NanoModuleLoader,
        });
    }
    for (const module of METAMODULES) {
      if (module) await execModule(module);
    }
  }
}

async function fetchNanoModules() {
  const NANOMODULES = [];

  try {
    const importedModule = await getNanoModule();
    if (importedModule) {
      let NanoModuleLoader = importedModule.ModuleLoader;
      let NanoModulesIndex = importedModule.MODULES;
      return { NanoModuleLoader, NanoModulesIndex };
    }
  } catch (e) {
    const { code, message } = e;
    console.log(`${code}: ${message}`);
  }

  return NANOMODULES;
}

async function getNanoModule() {
  try {
    let importedModule = null;
    const IS_PRODUCTION = process.env.NODE_ENV === "production";
    if (IS_PRODUCTION) {
      importedModule = await import(
        /* webpackIgnore: true */
        NANOMODULES_URL_PROD
      );
    } else {
      importedModule = await import(
        /* webpackIgnore: true */
        NANOMODULES_URL_DEV
      );
    }
    return importedModule;
  } catch (e) {
    console.log(e);
  }
}

async function setupMetaModule(modid, { modulePath, moduleLoader }) {
  let moduleName = modulePath;
  let moduleDescription = "...";
  let moduleVersion = "...";
  let moduleOutput = "...";
  const module = new Module(modid);
  new Modules().insertModuleTemplate(module.getModuleTemplate());
  module.updateName(moduleName);
  module.updateDescription(moduleDescription);
  module.updateVersion(moduleVersion);
  module.updateOutput(moduleOutput);
  const importedModule = await moduleLoader(modulePath);
  const instance = new importedModule.default();
  moduleName = instance.MODULE_NAME ? instance.MODULE_NAME : "-";
  moduleDescription = instance.MODULE_DESCRIPTION
    ? instance.MODULE_DESCRIPTION
    : "-";
  moduleVersion = instance.MODULE_VERSION ? instance.MODULE_VERSION : "-";
  const moduleMailId = instance.MODULE_MAIL_ID || null;
  const moduleMailHandler = instance.MODULE_MAIL_HANDLER || null;
  instance.MODULE_OUTPUT = new NanoOutput(modid);
  if (moduleMailId) instance.MODULE_MAIL = { send: (m) => nanoMail.send(m) };
  if (moduleMailId && moduleMailHandler) {
    nanoMail.onReceive(moduleMailId, moduleMailHandler);
  }
  module.updateName(moduleName);
  module.updateDescription(moduleDescription);
  module.updateVersion(moduleVersion);
  instance.MODULE_ID = modid;
  METAMODULES.push(instance);
}

async function execModule(instance) {
  const hasPulse = instance.MODULE_PULSE || false;
  if (hasPulse) {
    const module = new Module(instance.MODULE_ID);
    module.enablePulse();
  }
  if (instance.MODULE_MAIN && typeof instance.MODULE_MAIN === "function") {
    try {
      await instance.MODULE_MAIN();
    } catch (error) {
      instance.MODULE_OUTPUT.print(`ERROR: ${error.code}: ${error.message}`);
    }
  }
}
