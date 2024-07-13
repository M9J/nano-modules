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

  // print_v2(newOutput) {
  //   const canvas = this.#getOutputContainer();
  //   const ctx = canvas.getContext("2d");
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.fillStyle = "#fff";
  //   ctx.font = "12px monospace";
  //   ctx.fillText(newOutput, 0, 10);
  // }

  printLine(newOutput) {
    const outputContainer = this.#getOutputContainer();
    if (outputContainer.innerText === "...") this.print("");
    outputContainer.prepend(newOutput, document.createElement("br"));
  }

  printElement(element) {
    const outputContainer = this.#getOutputContainer();
    if (outputContainer.innerText === "...") this.print("");
    outputContainer.appendChild(element);
  }

  prompt(placeholder, isValueRequired = false) {
    return new Promise((resolve) => {
      const promptTemplate = document.createElement("div");
      promptTemplate.classList.add("nano_module_output_prompt");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `${placeholder}? (Required)`;
      promptTemplate.appendChild(input);
      const button = document.createElement("button");
      button.type = "button";
      button.innerHTML = "OK";
      button.onclick = () => {
        const value = input.value;
        const canProceed = !(isValueRequired && value.length === 0);
        if (canProceed) {
          resolve(input.value);
          const container = document.getElementById(
            `nano_module_${this.#modid}_output_container`
          );
          container.removeChild(promptTemplate);
        }
      };
      promptTemplate.appendChild(button);
      const container = document.getElementById(
        `nano_module_${this.#modid}_output_container`
      );
      container.prepend(promptTemplate);
    });
  }

  hide() {
    const container = this.#getOutputContainer();
    container.classList.add("hidden");
  }

  show() {
    const container = this.#getOutputContainer();
    container.classList.remove("hidden");
  }
}
