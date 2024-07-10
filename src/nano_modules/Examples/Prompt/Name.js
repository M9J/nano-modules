export default class Name {
  MODULE_NAME = "Name prompt";
  MODULE_DESCRIPTION = "Prompts for name";
  MODULE_VERSION = "1.0";
  MODULE_MAIN = () => {
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.onchange = this.onChange.bind(this);
    console.log(nameInput);
    this.MODULE_OUTPUT.printElement(nameInput);
  };

  onChange(e) {
    const name = e.target.value;
    this.MODULE_OUTPUT.print(`Name: ${name}`);
  }
}
