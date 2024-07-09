import NanoDOM from "../app/NanoDOM";

export default class Header extends NanoDOM {
  constructor() {
    super();
    this.addClass("nano_modules_title");
    this.setInnerHTML("NanoModules");
    return this.node;
  }
}
