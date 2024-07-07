export default class Teacher {
  MODULE_NAME = "Teacher";
  MODULE_DESCRIPTION = "Teacher broadcasts to students";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIL_ID = "teacher@nano.mods";
  MODULE_MAIN = () => {
    let msgid = 0;
    let intrvl1 = setInterval(() => {
      this.MODULE_OUTPUT.printLine(
        `broadcasted: ${msgid}, broadcasting next: ${msgid + 1}`
      );
      this.MODULE_MAIL.send({
        from: this.MODULE_MAIL_ID,
        to: ["student1@nano.mods", "student2@nano.mods"],
        message: "broadcast-message",
        data: { value: msgid++ },
      });
    }, 1000);
  };
}
