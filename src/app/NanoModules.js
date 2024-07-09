export default async function () {
  console.log("> Nanomod.js _");
  const NANOMODULES = [];

  try {
    const importedModule = await getNanoModule();
    if (importedModule) {
      let NanoModulesIndex = [];
      let NanoModuleLoader = () => {};
      if (importedModule) {
        NanoModuleLoader = importedModule.ModuleLoader;
        NanoModulesIndex = importedModule.MODULES;
      }
      return { NanoModuleLoader, NanoModulesIndex };
    }
  } catch (e) {
    const { code, message } = e;
    console.log(`${code}: ${message}`);
  }

  return NANOMODULES;
}

const NANOMODULES_URL_DEV = "../nano_modules/index.js";
const NANOMODULES_URL_PROD = "https://M9J.github.io/nano_modules/index.js";

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
