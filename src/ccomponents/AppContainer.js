import NanoDOM from "../app/NanoDOM";
import Footer from "./Footer";
import Header from "./Header";
import Modules from "./Modules";

export default class AppContainer extends NanoDOM {
  constructor() {
    super();
    this.addClass("nano_modules_container");
    this.appendChild(new Header());
    this.appendChild(new Modules().node);
    this.appendChild(new Footer());
    return this.node;
  }
}
