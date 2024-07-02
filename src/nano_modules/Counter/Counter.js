export default class Counter {
  MODULE_NAME = "Counter";
  MODULE_DESCRIPTION = "Counts starting from 0";
  MODULE_VERSION = "0.1";
  MODULE_PULSE = true;
  MODULE_MAIN = (o) => this.count(o);

  count(o) {
    let c = 0;
    setInterval(() => {
      o.update(++c);
    }, 1000);
    return c;
  }
}
