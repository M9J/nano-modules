export default async function () {
  console.log("> Nanomod.js _");
  const NANOMODULES = [];

  try {
    const MODULE_INDEX = await getModuleIndex();
    if (MODULE_INDEX) {
      const MODULES = MODULE_INDEX.default;
      const hasModules = Array.isArray(MODULES) ? MODULES.length > 0 : false;
      if (hasModules) {
        for (const MODULE of MODULES) {
          NANOMODULES.push(MODULE);
        }
      }
    }
  } catch (e) {
    const { code, message } = e;
    console.log(`${code}: ${message}`);
  }

  return NANOMODULES;
}

const NANOMODULES_URL_DEV = "./nano_modules/index.js";
const NANOMODULES_URL_PROD =
  "https://cdn.jsdelivr.net/gh/M9J/nano_modules@latest/index.js";

async function getModuleIndex() {
  try {
    let NanoModulesIndex = [];
    const IS_PRODUCTION = process.env.NODE_ENV === "production";
    if (IS_PRODUCTION) {
      NanoModulesIndex = await import(
        /* webpackIgnore: true */
        NANOMODULES_URL_PROD
      );
    } else {
      NanoModulesIndex = await import(
        /* webpackIgnore: true */
        NANOMODULES_URL_PROD
      );
    }
    return NanoModulesIndex;
  } catch (e) {
    console.log(e);
  }
}
