export default class Bob {
  MODULE_NAME = "Bob";
  MODULE_DESCRIPTION = "Sends message to Alice.";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIL_ID = "bob@nano.mods";
  MODULE_MAIL_HANDLER = ({ message, data, from }) => {
    this.MODULE_OUTPUT.printLine(`${from}: ${message}: ${data.value}`);
    if (message === "+3") {
      data.value = data.value + 3;
      this.MODULE_MAIL.send({
        from: this.MODULE_MAIL_ID,
        to: "alice@nano.mods",
        message: "+1",
        data: data,
      });
    }
  };

  MODULE_MAIN = () => {
    this.MODULE_MAIL.send({
      from: this.MODULE_MAIL_ID,
      to: "alice@nano.mods",
      message: "+1",
      data: {
        value: 1,
      },
    });
  };
}
