export default class Student2 {
  MODULE_NAME = "Student2";
  MODULE_DESCRIPTION = "Student receives broadcasts from Teacher";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIL_ID = "student2@nano.mods";
  MODULE_MAIL_HANDLER = ({ from, message, data }) => {
    this.MODULE_OUTPUT.printLine(`${from}: ${JSON.stringify(data)}`);
  };
}
