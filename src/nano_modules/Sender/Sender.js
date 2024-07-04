export default class Sender {
  MODULE_NAME = "Sender Module 1";
  MODULE_DESCRIPTION = "This module sends message";
  MODULE_VERSION = "1.0";
  MODULE_CHANNEL_ID = "sender@nanomodules.channel";

  MODULE_MAIN = (o) => {
    o.channel.onReceive(this.MODULE_CHANNEL_ID, ({ message, from }) => {
      o.printLine(`${from}: ${message}`);

      let tmr1 = setTimeout(() => {
        clearTimeout(tmr1);
        o.channel.send({
          from: this.MODULE_CHANNEL_ID,
          to: "receiver@nanomodules.channel",
          message: parseInt(message) + 1,
        });
      }, 1000);
    });
    let tmr = setTimeout(() => {
      clearTimeout(tmr);
      console.log("message sent");
      o.channel.send({
        from: this.MODULE_CHANNEL_ID,
        to: "receiver@nanomodules.channel",
        message: "1",
      });
    }, 1000);
  };
}
