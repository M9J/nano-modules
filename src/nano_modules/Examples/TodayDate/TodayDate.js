export default class TodayDate {
  MODULE_NAME = "Today's Date";
  MODULE_DESCRIPTION = "Prints today's date and time";
  MODULE_VERSION = "0.1";
  MODULE_PULSE = true;
  MODULE_MAIN = () => this.todayDate();

  todayDate() {
    setInterval(() => {
      this.MODULE_OUTPUT.print(new Date().toLocaleString());
    }, 1000);
    return new Date().toLocaleString();
  }
}
