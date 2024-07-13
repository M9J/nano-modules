export default class Logger {
  MODULE_NAME = "Logger Example";
  MODULE_DESCRIPTION = "Shows the behavior of logger";
  MODULE_VERSION = "1.0";
  MODULE_PULSE = true;
  MODULE_MAIN = () => {
    let line = 0;
    setInterval(() => {
      this.MODULE_OUTPUT.printLine(`Log line ${++line}`);
    }, 0);
  };
}
