export default class Mailer {
  MODULE_NAME = "Mailer prompt";
  MODULE_DESCRIPTION = "Prompts for nano.mods mail ID and sends test message";
  MODULE_VERSION = "1.0";
  MODULE_MAIL_ID = "mailer@nano.mods";
  MODULE_MAIN = () => {
    this.promptForMailId();
  };

  async promptForMailId() {
    const mailId = await this.MODULE_OUTPUT.prompt("Mail ID", true);
    this.MODULE_MAIL.send({
      to: mailId,
      from: this.MODULE_MAIL_ID,
      message: "Test",
      data: {
        epoch: Date.now(),
      },
    });
    await this.promptForMailId();
  }
}
