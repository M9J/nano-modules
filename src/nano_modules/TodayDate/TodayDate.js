export default class TodayDate {
  MODULE_NAME = "Today Date";
  MODULE_DESCRIPTION = "Prints today's date and time";
  MODULE_VERSION = "0.1";
  MODULE_MAIN = () => this.todayDate();

  todayDate() {
    return new Date().toLocaleString();
  }
}
