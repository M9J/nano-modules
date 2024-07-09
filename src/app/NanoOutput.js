export default class NanoOutput {
  #modid = null;

  constructor(modid) {
    if (modid !== null) this.#modid = modid;
  }

  #getOutputContainer() {
    const outputContainer = document.getElementById(
      `nano_module_${this.#modid}_output`
    );
    return outputContainer;
  }

  print(newOutput) {
    const container = this.#getOutputContainer();
    container.innerHTML = newOutput;
  }

  printLine(newOutput) {
    const outputContainer = this.#getOutputContainer();
    if (outputContainer.innerText === "...") this.print("");
    outputContainer.prepend(newOutput, document.createElement("br"));
  }
}
