export default class Student1 {
  MODULE_NAME = "Student1";
  MODULE_DESCRIPTION = "Student receives broadcasts from Teacher";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIL_ID = "student1@nano.mods";
  MODULE_MAIL_HANDLER = ({ from, message, data }) => {
    this.MODULE_OUTPUT.printLine(`${from}: ${JSON.stringify(data)}`);
  };
}
