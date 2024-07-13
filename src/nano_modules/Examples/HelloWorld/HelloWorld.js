export default class HelloWorld {
  MODULE_NAME = "Hello World";
  MODULE_DESCRIPTION = "Hello World Nano Module";
  MODULE_VERSION = "1.0";
  MODULE_MAIN = () =>
    this.MODULE_OUTPUT.print("Hello world from source example");
}
