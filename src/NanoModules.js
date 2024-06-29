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

async function getModuleIndex() {
  try {
    let NanoModulesIndex = [];
    if (process.env.NODE_ENV === "production") {
      NanoModulesIndex = await import("./nano_modules/index.js");
    } else {
      NanoModulesIndex = await import("./nano_modules/index.js");
    }
    return NanoModulesIndex;
  } catch (e) {
    console.log(e);
  }
}
