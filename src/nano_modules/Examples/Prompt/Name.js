export default class Name {
  MODULE_NAME = "Name prompt";
  MODULE_DESCRIPTION = "Prompts for name";
  MODULE_VERSION = "1.0";
  MODULE_MAIN = () => {
    this.promptForName();
  };

  async promptForName() {
    this.MODULE_OUTPUT.hide();
    const name = await this.MODULE_OUTPUT.prompt("Name", true);
    this.MODULE_OUTPUT.show();
    this.MODULE_OUTPUT.printLine(`Hi ${name}`);
  }
}
