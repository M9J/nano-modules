import NanoDOM from "../app/NanoDOM";

export default class Modules extends NanoDOM {
  constructor() {
    super();
    this.addClass("nano_modules_modules");
    this.setId("nano_modules_modules");
    // return this.node;
  }

  insertModuleTemplate(moduleTemplate) {
    if (moduleTemplate) {
      const modules = document.getElementById("nano_modules_modules");
      modules.appendChild(moduleTemplate)
    }
  }
}
