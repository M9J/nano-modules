export default class Alice {
  MODULE_NAME = "Alice";
  MODULE_DESCRIPTION = "Sends message to Celine";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIL_ID = "alice@nano.mods";
  MODULE_MAIL_HANDLER = ({ message, data, from }) => {
    if (message === "+1") {
      data.value = data.value + 1;
    }
    this.MODULE_OUTPUT.printLine(`${from}: ${message}: ${data.value}`);
    this.MODULE_MAIL.send({
      from: this.MODULE_MAIL_ID,
      to: "celine@nano.mods",
      message: "+2",
      data: data,
    });
  };
}
