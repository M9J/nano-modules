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
// const NANOMODULES_URL_PROD1 =
//  "https://cdn.jsdelivr.net/gh/M9J/nano_modules/index.js";
// const NANOMODULES_URL_PROD1a =
//   "https://purge.jsdelivr.net/gh/M9J/nano_modules/index.js";
// const NANOMODULES_URL_PROD2 =
//   "https://cdn.statically.io/gh/M9J/nano_modules/main/index.js";
const NANOMODULES_URL_PROD3 = "https://M9J.github.io/nano_modules/index.js";

async function getModuleIndex() {
  try {
    let NanoModulesIndex = [];
    const IS_PRODUCTION = process.env.NODE_ENV === "production";
    if (IS_PRODUCTION) {
      NanoModulesIndex = await import(
        /* webpackIgnore: true */
        NANOMODULES_URL_PROD3
      );
    } else {
      NanoModulesIndex = await import(
        /* webpackIgnore: true */
        NANOMODULES_URL_DEV
      );
    }
    return NanoModulesIndex;
  } catch (e) {
    console.log(e);
  }
}
