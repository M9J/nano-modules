export default class Counter {
  MODULE_NAME = "Counter";
  MODULE_DESCRIPTION = "Counts starting from 0";
  MODULE_VERSION = "0.1";
  MODULE_PULSE = true;
  MODULE_MAIN = () => this.count();

  count() {
    let c = 0, delay = 0;
    setInterval(() => {
      this.MODULE_OUTPUT.print(++c);
    }, delay);
    return c;
  }
}
