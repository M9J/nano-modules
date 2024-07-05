export default class Celine {
  MODULE_NAME = "Celine";
  MODULE_DESCRIPTION = "Sends message to Bob";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIL_ID = "celine@nano.mods";
  MODULE_MAIL_HANDLER = ({ message, data, from }) => {
    if (message === "+2") {
      data.value = data.value + 2;
    }
    this.MODULE_OUTPUT.printLine(`${from}: ${message}: ${data.value}`);
    this.MODULE_MAIL.send({
      from: this.MODULE_MAIL_ID,
      to: "bob@nano.mods",
      message: "+3",
      data: data,
    });
  };
}
