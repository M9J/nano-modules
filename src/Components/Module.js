import NanoDOM from "../app/NanoDOM";

export default class Module extends NanoDOM {
  #modid = null;

  constructor(modid) {
    super();
    if (modid !== null) this.#modid = modid;
  }

  getModuleTemplate() {
    const moduleContainer = new NanoDOM("div");
    moduleContainer.addClass("nano_modules_module");
    moduleContainer.setId(`nano_module_${this.#modid}`);
    const moduleName = this.getModuleNameTemplate();
    moduleContainer.appendChild(moduleName);
    const moduleDescription = this.getModuleDescriptionTemplate();
    moduleContainer.appendChild(moduleDescription);
    const moduleOutputLabelRow = this.getModuleOutputLabelRowTemplate();
    moduleContainer.appendChild(moduleOutputLabelRow);
    const moduleOutput = this.getModuleOutputTemplate();
    moduleContainer.appendChild(moduleOutput);
    return moduleContainer.node;
  }

  getModuleNameTemplate() {
    const moduleName = new NanoDOM("div");
    moduleName.addClass("nano_module_name");
    const boldLabel = new NanoDOM("b");
    boldLabel.setInnerHTML("Name:");
    const value = new NanoDOM("span");
    value.setId(`nano_module_${this.#modid}_name`);
    moduleName.appendChild(boldLabel.node);
    moduleName.appendChild(value.node);
    return moduleName.node;
  }

  getModuleDescriptionTemplate() {
    const moduleDescription = new NanoDOM("div");
    moduleDescription.addClass("nano_module_description");
    const boldLabel = new NanoDOM("b");
    boldLabel.setInnerHTML("Description:");
    const value = new NanoDOM("span");
    value.setId(`nano_module_${this.#modid}_description`);
    moduleDescription.appendChild(boldLabel.node);
    moduleDescription.appendChild(value.node);
    return moduleDescription.node;
  }

  getModuleOutputLabelRowTemplate() {
    const moduleOutputLabelRow = new NanoDOM("div");
    moduleOutputLabelRow.addClass("nano_module_output");
    const boldLabel = new NanoDOM("b");
    boldLabel.setInnerHTML("Output:");
    moduleOutputLabelRow.appendChild(boldLabel.node);
    const pulse = new NanoDOM("span");
    pulse.setId(`nano_module_${this.#modid}_pulse`);
    pulse.addClass("pulse");
    pulse.addClass("hidden");
    pulse.setInnerHTML("&nbsp;");
    const pulseDot = new NanoDOM("span");
    pulseDot.addClass("pulse_dot");
    pulse.appendChild(pulseDot.node);
    moduleOutputLabelRow.appendChild(pulse.node);
    const expander = new NanoDOM("span");
    expander.addClass("expander");
    moduleOutputLabelRow.appendChild(expander.node);
    const versionLabel = new NanoDOM("b");
    versionLabel.setInnerHTML("v");
    moduleOutputLabelRow.appendChild(versionLabel.node);
    const version = new NanoDOM("span");
    version.setId(`nano_module_${this.#modid}_version`);
    moduleOutputLabelRow.appendChild(version.node);
    return moduleOutputLabelRow.node;
  }

  getModuleOutputTemplate() {
    const moduleOutput = new NanoDOM("div");
    moduleOutput.addClass("nano_module_output_restricted_scrollable");
    moduleOutput.setId(`nano_module_${this.#modid}_output`);
    return moduleOutput.node;
  }

  #updateValue(elemId, value) {
    if (elemId) {
      const elem = document.getElementById(elemId);
      if (elem) elem.innerHTML = value;
    }
  }

  updateName(name) {
    if (name) {
      this.#updateValue(`nano_module_${this.#modid}_name`, name);
    }
  }

  updateDescription(description) {
    if (description) {
      this.#updateValue(`nano_module_${this.#modid}_description`, description);
    }
  }

  updateVersion(version) {
    if (version) {
      this.#updateValue(`nano_module_${this.#modid}_version`, version);
    }
  }

  updateOutput(output) {
    if (output !== null) {
      this.#updateValue(`nano_module_${this.#modid}_output`, output);
    }
  }

  enablePulse() {
    document
      .getElementById(`nano_module_${this.#modid}_pulse`)
      .classList.remove("hidden");
  }
}
