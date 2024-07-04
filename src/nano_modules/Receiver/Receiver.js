export default class Receiver {
  MODULE_NAME = "Receiver Module 1";
  MODULE_DESCRIPTION = "This module receives message";
  MODULE_VERSION = "1.0";
  MODULE_CHANNEL_ID = "receiver@nanomodules.channel";

  MODULE_MAIN = (o) => {
    o.channel.onReceive(this.MODULE_CHANNEL_ID, ({ message, from }) => {
      o.printLine(`${from}: ${message}`);
      let tmr1 = setTimeout(() => {
        clearTimeout(tmr1);
        o.channel.send({
          from: this.MODULE_CHANNEL_ID,
          to: "sender@nanomodules.channel",
          message: parseInt(message) + 1,
        });
      }, 1000);
    });
  };
}
